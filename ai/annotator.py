'''
[
    {
        "sentence": "Horses are too tall and they pretend to care about your feelings",
        "entities": [
            [0, 6, "ANIMAL"]
        ]
    },
    {
        "sentence": "they pretend to care about your feelings, those horses",
        "entities": [
            [48, 54, "ANIMAL"]
        ]
    }
]

\d -> "" remove digits
^\n -> "" remove new lines
^|$ -> """ to wrap lines in quotes
$ -> "," to wrap end of lines with comma
'''
import spacy
import plac
import json
from pathlib import Path

nlp = spacy.load('en')

@plac.annotations(
    word_list=("The JSON array of food words to parse and annotate", "option", "wl", str),
    sentence_list=("JSON array of sentences to parse the word_list from", "option", "sl", str),
    output_file=("Output file to save annotated sentences", "option", "o", str))
def main(word_list=None, sentence_list=None, output_file=None):
    if word_list is not None and sentence_list is not None and output_file is not None:
        with open(word_list) as f:
            words = json.load(f)
        with open(sentence_list) as f:
            sentences = json.load(f)

        annotated = []

        for sent in sentences:
            sentence =  nlp(sent)

            words_in_sent = []
            for word in sentence:
                if word.text in words:
                    words_in_sent.append([ word.idx, len(word.text)+word.idx, 'FOOD' ])

            annotated.append({
                "sentence": sent,
                "entities": words_in_sent
            })

        with open(output_file, 'w') as outfile:
            json.dump(annotated, outfile)

#####################################################################################

if __name__ == '__main__':
    plac.call(main)
