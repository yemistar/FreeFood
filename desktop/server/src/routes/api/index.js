const express = require('express');
const axios = require('axios');
const cjson = require('circular-json');

const { prolong } = require('../../mw/prolong.js');
const { googleAuthenticate } = require('../../mw/authenticate.js');
const { listEmails, getEmail } = require('../../fetch');

var route = require('express').Router();

route.use(prolong);

route.post('/list', googleAuthenticate, (req, res) => {
  const { pageToken } = req.body;

  listEmails(req.app.get('gmail'), pageToken).then((list) => {
    let promises = list.messages.map((m) => getEmail(req.app.get('gmail'), m['id']))

    Promise.all(promises).then((data) => {
      let morePromises = data.map((d) => axios({method: 'post', url:'http://127.0.0.1:5000', timeout: 60000, data: {email: d}}))

      Promise.all(morePromises).then((pdata) => {
        let finalData = pdata.map((d) => d.data);
        finalData = finalData.filter((d) => d["data"] !== null);
        res.send(finalData);
      });
    });
  }).catch((err) => {
    console.log(err);
    res.send({err: err.message | 'Server Error'});
  });
});

module.exports = route;
