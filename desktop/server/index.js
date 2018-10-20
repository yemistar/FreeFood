const fs = require('fs');
const path = require('path');
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const passport = require('passport');
const { google } = require('googleapis');

const routes = require('./src/routes');

const googleAuth = new google.auth.OAuth2(
  '95517113578-75pffsdnlubogcctd51v25j2vg8ucmlb.apps.googleusercontent.com',
  'z8M0igQVl748qMWeqJ5r5mzn',
  'https://www.freefood.org/auth/redirect'
);

google.options({auth: googleAuth});

const authorizeUrl = googleAuth.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/gmail.readonly',
});

const gmail = google.gmail({
  version: 'v1',
  auth: googleAuth,
});

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", 'https://www.freefood.org');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());
app.use(helmet());

app.set('gmailAuthorize', authorizeUrl);
app.set('googleAuth', googleAuth);
app.set('gmail', gmail);

app.use('/', routes.root);
app.use('/auth', routes.auth);

https.createServer({
  key: fs.readFileSync(path.join(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
  passphrase: 'password1!'
}, app).listen(443, () => {
  console.log(`App listening on port 443`);
});
