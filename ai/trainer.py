#!/usr/bin/env python
# coding: utf8
"""
For more details, see the documentation:
* Training: https://spacy.io/usage/training
* NER: https://spacy.io/usage/linguistic-features#named-entities



Compatible with: spaCy v2.0.0+

pip install "msgpack-numpy<0.4.4.0" <-- for saving model with Python 2.7, but, I want to use python3...



"""
from __future__ import unicode_literals, print_function

import plac
import random
import json
import time
from pathlib import Path
import spacy
from spacy.util import minibatch, compounding

LABEL = 'FOOD'
FULL_DATA = []
TRAIN_DATA = []
TEST_DATA = []

with open('annotated_foods.json') as f:
    data = json.load(f)
    for s in data:
        ents = []
        for e in s["entities"]:
            ents.append((e[0], e[1], e[2]))
        FULL_DATA.append((
            s["sentence"],
            { "entities": ents }
        ))

random.shuffle(FULL_DATA)
split_index = int(len(FULL_DATA)*0.75)
TRAIN_DATA = FULL_DATA[:split_index]
TEST_DATA = FULL_DATA[split_index+1:]
TEST_DATA.append((
    "There will be soda, pizza, candy, and burgers at the Hackathon tonight!",
    { "entities": [] }
))


@plac.annotations(
    model=("Model name. Defaults to blank 'en' model.", "option", "m", str),
    new_model_name=("New model name for model meta.", "option", "nm", str),
    output_dir=("Optional output directory", "option", "o", Path),
    n_iter=("Number of training iterations", "option", "n", int))
def main(model=None, new_model_name='animal', output_dir=None, n_iter=10):
    """Set up the pipeline and entity recognizer, and train the new entity."""
    if model is not None:
        nlp = spacy.load(model)  # load existing spaCy model
        print("Loaded model '%s'" % model)
    else:
        nlp = spacy.blank('en')  # create blank Language class
        print("Created blank 'en' model")
    # Add entity recognizer to model if it's not in the pipeline
    # nlp.create_pipe works for built-ins that are registered with spaCy
    if 'ner' not in nlp.pipe_names:
        ner = nlp.create_pipe('ner')
        nlp.add_pipe(ner)
    # otherwise, get it, so we can add labels to it
    else:
        ner = nlp.get_pipe('ner')

    ner.add_label(LABEL)   # add new entity label to entity recognizer
    if model is None:
        optimizer = nlp.begin_training(cpu_count=6)
    else:
        # Note that 'begin_training' initializes the models, so it'll zero out
        # existing entity types.
        optimizer = nlp.entity.create_optimizer()

    # get names of other pipes to disable them during training
    other_pipes = [pipe for pipe in nlp.pipe_names if pipe != 'ner']
    with nlp.disable_pipes(*other_pipes):  # only train NER
        start_time = time.time()
        for itn in range(n_iter):
            random.shuffle(TRAIN_DATA)
            losses = {}
            # batch up the examples using spaCy's minibatch
            batches = minibatch(TRAIN_DATA, size=compounding(4., 32., 1.001))
            for batch in batches:
                texts, annotations = zip(*batch)
                nlp.update(texts, annotations, sgd=optimizer, drop=0.35, losses=losses)
            print('Losses', losses)
        end_time = time.time()
        elapsed = end_time-start_time
        print('Training Time: ' + str(elapsed) + ' sec')

    # test the trained model
    '''
    for test_text in TEST_DATA:
        doc = nlp(test_text[0])
        #print("Entities in " + test_text[0])
        for ent in doc.ents:
            print(ent.label_, ent.text)
    '''

    # save model to output directory
    if output_dir is not None:
        output_dir = Path(output_dir)
        if not output_dir.exists():
            output_dir.mkdir()
        nlp.meta['name'] = new_model_name  # rename model
        nlp.to_disk(output_dir)
        print("Saved model to", output_dir)

if __name__ == '__main__':
    plac.call(main)
