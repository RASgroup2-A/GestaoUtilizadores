const mongoose = require('mongoose')

const passportLocalMongoose = require('passport-local-mongoose');

var usersSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  numMecanografico: String,
  email: String,
  password: String,
  type: String
});

userSchema.plugin(passportLocalMongoose);

module.exports  = mongoose.model('users', usersSchema)