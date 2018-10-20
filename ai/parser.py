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

urlRegex = re.compile('\(?(?:(http|https|ftp):\/\/)?(?:((?:[^\W\s]|\.|-|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.|-)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?')
htmlEntityRegex = re.compile('&#?\w{1,10};')
multiSpaceRegex = re.compile('(\s|\t|\r|\n){3,}')
spaceRegex = re.compile('\s+')
newLineRegex = re.compile('\n')

def parse_base64(text):
    return unquote(base64.b64decode(text.replace('-', '+').replace('_', '/')).decode('utf-8'))

def parse_regex(text):
    text = re.sub(htmlEntityRegex, '', text)
    text = re.sub(urlRegex, '', text)
    text = re.sub(multiSpaceRegex, '\n', text)
    text = re.sub(spaceRegex, ' ', text)
    text = re.sub(newLineRegex, '. ', text)
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
    locations = []
    places = []
    organizations = []
    buildings = []
    times = []
    dates = []
    foods = []

    for ent in food_doc.ents:
        if ent.text.lower() in food_names and ent.text.lower() not in foods:
            foods.append(ent.text.lower())

    for token in en_doc:
        if token.text.lower() in food_words and token.text.lower() not in locations:
            foods.append(token.text.lower())
            break
        if token.text in isu_buildings and token.text not in locations:
            locations.append(token.text)

    if len(foods) <= 0:
        return None

    for ent in en_doc.ents:
        if ent.label_ == 'LOC' and ent.text != '\n' and ent.text not in locations:
            locations.append(ent.text)
        elif ent.label_ == 'GPE' and ent.text != '\n' and ent.text not in places:
            places.append(ent.text)
        elif ent.label_ == 'ORG' and ent.text != '\n' and ent.text not in organizations:
            organizations.append(ent.text)
        elif ent.label_ == 'FAC' and ent.text != '\n' and ent.text not in buildings:
            buildings.append(ent.text)
        elif ent.label_ == 'TIME' and ent.text != '\n' and ent.text not in times:
            times.append(ent.text)
        elif ent.label_ == 'DATE' and ent.text != '\n' and ent.text not in dates:
            dates.append(ent.text)

    if len(locations) > 0:
        entities['locations'] = locations
    if len(places) > 0:
        entities['places'] = places
    if len(organizations) > 0:
        entities['organizations'] = organizations
    if len(buildings) > 0:
        entities['buildings'] = buildings
    if len(times) > 0:
        entities['times'] = times
    if len(dates) > 0:
        entities['dates'] = dates
    if len(foods) > 0:
        entities['foods'] = foods

    if len(entities.values()) > 0:
        return entities
    else:
        return None

#####################################################################
#####################################################################
def parse(email):
    parts = []
    if "parts" in email["payload"]:
        parts = parse_parts([email['payload']['parts'][0]])
    else:
        parts = parse_parts([email['payload']])

    entities = []
    for part in parts:
        if 'data' in part['body']:
            p = parse_part(part['body']['data'])
            if p is not None:
                entities.append({
                    'data': p,
                    'mimeType': part['mimeType'],
                    'id': email['id'],
                    'labelIds': email['labelIds']
                });
            else:
                entities.append({
                    'data': [],
                    'mimeType': part['mimeType'],
                    'id': email['id'],
                    'labelIds': email['labelIds']
                });

    return entities

'''
with open('sample_email.json') as f:
    email = json.load(f)

    parts = parse_parts(email['payload']['parts'])
    text = parts[0]['body']['data']
    print(text)
'''
