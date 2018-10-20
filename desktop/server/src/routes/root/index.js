const express = require('express');
const axios = require('axios');
const cjson = require('circular-json');

const { listEmails, getEmail } = require('../../fetch');

var route = require('express').Router();

route.use((req, res, next) => {
  res.connection.setTimeout(60000);
  next();
})

route.get('/', (req, res) => {
  if(req.app.get('googleAuth').credentials) {
    listEmails(req.app.get('gmail')).then((list) => {
      //let promises = list.messages.map((m) => getEmails(gmail, m['id']))

      let promises = []
      for(let i = 0; i < 50; i++) {
        promises.push(getEmail(req.app.get('gmail'), list.messages[i]['id']))
      }

      Promise.all(promises).then((data) => {
        let morePromises = data.map((d) => axios({method: 'post', url:'http://127.0.0.1:5000', timeout: 60000, data: {email: d}}))

        Promise.all(morePromises).then((pdata) => {
          let finalData = pdata.map((d) => d.data);
          res.send(finalData);
        });
      });
    }).catch((err) => {
      console.log(err);
    });
  } else {
    res.redirect('/auth/login');
  }
});

module.exports = route;
