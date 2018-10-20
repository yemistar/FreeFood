const express = require('express');
var route = require('express').Router();

route.get('/login', (req, res) => {
  res.redirect(req.app.get('gmailAuthorize'));
});

route.get('/redirect', (req, res) => {
  const { code } = req.query;
  req.app.get('googleAuth').getToken(code, (err, token) => {
    if(err) { reject(err); }
    req.app.get('googleAuth').credentials = token;
    res.redirect('/');
  });
});

module.exports = route;
