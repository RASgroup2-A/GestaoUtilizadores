const mongoose = require('mongoose')

var usersSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    numMecanografico: String,
    email: String,
    password: String,
    type: String
});

module.exports  = mongoose.model('users', usersSchema)