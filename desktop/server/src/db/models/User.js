const mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
    googleId: {
      type: String,
      required: true,
      minlength: 10
    }
});

var User = mongoose.model('Users', UserSchema);

module.exports = {
  User: User
}
