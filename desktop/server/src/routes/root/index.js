const express = require('express');

const { listEmails, getEmail } = require('../../fetch');

var route = require('express').Router();

route.get('/', (req, res) => {
  if(req.app.get('googleAuth').credentials) {
    listEmails(req.app.get('gmail')).then((list) => {
      //let promises = list.messages.map((m) => getEmails(gmail, m['id']))

      let promises = [getEmail(req.app.get('gmail'), list.messages[0]['id'])]

      Promise.all(promises).then((data) => res.send(data))

    }).catch((err) => {
      console.log(err);
    });
  } else {
    res.redirect('/auth/login');
  }
});

module.exports = route;
