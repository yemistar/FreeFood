import base64
import re
import json
from bs4 import BeautifulSoup as bs
from urllib.parse import unquote
import spacy

EnglishModel = spacy.load('en')
FoodModel = spacy.load('./food_model')
FoodModel.add_pipe(FoodModel.create_pipe('sentencizer'))

with open('food_names.json') as f:
    food_names = json.load(f)
with open('foodlike_words.json') as f:
    food_words = json.load(f)
with open('isu_campus_buildings.json') as f:
    isu_buildings = json.load(f)
with open('date_words.json') as f:
    date_words = json.load(f)
with open('time_words.json') as f:
    time_words = json.load(f)

urlRegex = re.compile('\(?(?:(http|https|ftp):\/\/)?(?:((?:[^\W\s]|\.|-|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.|-)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?')
htmlEntityRegex = re.compile('&#?\w{1,10};')
multiSpaceRegex = re.compile('(\s|\t|\r|\n){3,}')
spaceRegex = re.compile('\s+')
dumbAssWordsRegex = re.compile('\s?[\.\@\#\$\%\^\&\*\(\)\-\=\[\{\}\|\:\'\<\>\?\/\\\s]{2,}\s')
newLineRegex = re.compile('\n')
dumbAssCharsRegex = re.compile('(\W{2,}(?=\s))|(^\W)|(\W$)')

def parse_base64(text):
    return unquote(base64.b64decode(text.replace('-', '+').replace('_', '/')).decode('utf-8'))

def parse_regex(text):
    text = re.sub(htmlEntityRegex, '', text)
    text = re.sub(urlRegex, '', text)
    text = re.sub(multiSpaceRegex, '\n', text)
    text = re.sub(spaceRegex, ' ', text)
    text = re.sub(newLineRegex, '. ', text)
    text = text.strip()
    text = re.sub(dumbAssWordsRegex, ' ', text)
    text = text.strip()
    return text;

def iterate_parts(part):
    if part['mimeType'] == 'text/html' and 'data' in part['body']:
        raw = parse_base64(part['body']['data'])
        soup = bs(raw, 'html.parser')
        for s in soup(["script", "style"]):
            s.extract()
        raw = soup.get_text()
        raw = parse_regex(raw)
        part['parsed'] = True
        part['body']['data'] = raw
        return part
    elif part['mimeType'] == 'text/plain' and 'data' in part['body']:
        raw = parse_base64(part['body']['data'])
        raw = parse_regex(raw)
        part['parsed'] = True
        part['body']['data'] = raw
        return part
    else:
        part['parsed'] = False
        return part

def parse_parts(parts):
    return list(map(iterate_parts, parts))

def parse_part(part):
    food_doc = FoodModel(part)
    en_doc = EnglishModel(part)

    #LOC, GPE, ORG, FAC, TIME, DATE
    entities = {}
    locations = set()
    places = set()
    times = set()
    dates = set()
    foods = set()

    for ent in food_doc.ents:
        if ent.text.lower() in food_names and ent.text.lower():
            foods.add(ent.text.lower().strip())

    for token in en_doc:
        text = re.sub(dumbAssCharsRegex, '', token.text)
        if text.lower() in food_words and text.lower():
            foods.add(token.text.lower().strip())
            continue

    for isub in isu_buildings:
        if isub in part or isub.lower() in part:
                locations.add(isub)

    if len(foods) <= 0:
        return None

    for ent in en_doc.ents:
        text = re.sub(dumbAssCharsRegex, '', ent.text)
        if ent.label_ == 'LOC' or ent.label == 'GPE' or ent.label == 'ORG' or ent.label == 'FAC':
            for isub in isu_buildings:
             isuwords = isub.split(" ")
             for w in isuwords:
                 if text == w or text == w.lower():
                     locations.add(text)
                     break
        elif ent.label_ == 'TIME':
            times.add(text)
        elif ent.label_ == 'DATE':
            for d in date_words:
                if d in text.lower():
                    dates.add(text)
                    break

    if len(locations) > 0:
        entities['locations'] = list(locations)
    if len(times) > 0:
        entities['times'] = list(times)
    if len(dates) > 0:
        entities['dates'] = list(dates)
    if len(foods) > 0:
        entities['foods'] = list(foods)

    if len(entities.values()) > 0:
        return entities
    else:
        return None

#####################################################################
#####################################################################
def parse(email):
    parts = []
    if "parts" in email["payload"]:
        part = parse_parts([email['payload']['parts'][0]])[0]
    else:
        part = parse_parts([email['payload']])[0]

    entities = []
    if 'data' in part['body']:
        subject = None
        if 'headers' in email['payload']:
            for header in email['payload']['headers']:
                if header['name'] == 'Subject':
                    subject = header['value']
                    break
        raw = part['body']['data']
        p = parse_part(part['body']['data'])
        if p is not None:
            entities.append({
                'raw': raw,
                'subject': subject,
                'entities': p,
                'mimeType': part['mimeType'],
                'id': email['id'],
                'labelIds': email['labelIds']
            });

    if len(entities) > 0:
        return entities
    else:
        return None

'''
with open('sample_email.json') as f:
    email = json.load(f)

    parts = parse_parts(email['payload']['parts'])
    text = parts[0]['body']['data']
    print(text)
'''
