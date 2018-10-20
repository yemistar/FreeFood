const googleAuthenticate = (req, res, next) => {
  req.app.get('googleAuth').setCredentials(req.session['tokens']);
  next();
}

module.exports = {
  googleAuthenticate
}
