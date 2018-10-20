import base64
import re
import json
from bs4 import BeautifulSoup as bs
from urllib.parse import unquote
import spacy

EnglishModel = spacy.load('en')
FoodModel = spacy.load('./food_model')
FoodModel.add_pipe(FoodModel.create_pipe('sentencizer'))

urlRegex = re.compile('\(?(?:(http|https|ftp):\/\/)?(?:((?:[^\W\s]|\.|-|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.|-)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?')
htmlEntityRegex = re.compile('&#?\w{1,10};')
multiSpaceRegex = re.compile('(\s|\t|\r|\n){3,}')
spaceRegex = re.compile('\s\s')

def parse_base64(text):
    return unquote(base64.b64decode(text.replace('-', '+').replace('_', '/')).decode('utf-8'))

def parse_regex(text):
    text = re.sub(htmlEntityRegex, '', text)
    text = re.sub(urlRegex, '', text)
    text = re.sub(multiSpaceRegex, '\n', text)
    text = re.sub(spaceRegex, '', text)
    return text;

def iterate_parts(part):
    if part['mimeType'] == 'text/html':

        raw = parse_base64(part['body']['data'])
        soup = bs(raw, 'html.parser')
        for s in soup(["script", "style"]):
            s.extract()
        raw = soup.get_text()
        raw = parse_regex(raw)
        part['parsed'] = True
        part['body']['data'] = raw
        return part

    elif part['mimeType'] == 'text/plain':

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

    entities = {}
    locations = []
    places = []
    organizations = []
    buildings = []
    times = []
    dates = []
    foods = []
    #LOC, GPE, ORG, FAC, TIME, DATE

    for ent in en_doc.ents:
        if ent.label_ == 'LOC' and ent.text != '\n':
            locations.append(ent.text)
        elif ent.label_ == 'GPE' and ent.text != '\n':
            places.append(ent.text)
        elif ent.label_ == 'ORG' and ent.text != '\n':
            organizations.append(ent.text)
        elif ent.label_ == 'FAC' and ent.text != '\n':
            buildings.append(ent.text)
        elif ent.label_ == 'TIME' and ent.text != '\n':
            times.append(ent.text)
        elif ent.label_ == 'DATE' and ent.text != '\n':
            dates.append(ent.text)

    for ent in food_doc.ents:
        foods.append(ent.text)

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
        parts = parse_parts(email['payload']['parts'])
    else:
        parts = parse_parts([email['payload']])

    entities = []
    for part in parts:
        p = parse_part(part['body']['data'])
        if p is not None:
            entities.append(p)

    return entities

'''
with open('sample_email.json') as f:
    email = json.load(f)

    entities = parse(email)

    print(entities)
'''
