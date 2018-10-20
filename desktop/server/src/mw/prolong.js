const prolong = (req, res, next) => {
  res.connection.setTimeout(60000);
  next();
}

module.exports = {
  prolong
}
