var mongoose = require('mongoose');
var UserSchema = mongoose.Schema({
  login: String,
  password: String,
  email : String,
  date : { type: Date, default: Date.now },
  alarms : [String],
  pairs : [String],
  picture : String,
});
var Users = mongoose.model('Users', UserSchema);

module.exports = Users;