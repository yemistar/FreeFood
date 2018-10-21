'''

1.) Finish gathering dataset of foods
2.) Get dataset of Iowa State Buildings, surrounding parks, and popular stores, resturants, and bars
3.) How to deploy on Heroku? AWS?
4.) ?

'''
from flask import Flask
from flask import request
from flask import jsonify
import json
import spacy
from parser import parse


app = Flask(__name__)

@app.route('/', methods = ['POST'])
def root():

    data = request.get_json('email')
    if data['email'] is not None:
        parsed_parts = parse(data['email'])
        
        payload = {'data': parsed_parts}

        return jsonify(payload)
    else:
        return jsonify({'err': 'Need to pass email object'})

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
