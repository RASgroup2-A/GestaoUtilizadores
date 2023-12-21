const mongoose = require('mongoose')
const {version} = require("mongoose");

const passportLocalMongoose = require('passport-local-mongoose');

var usersSchema = new mongoose.Schema({
    _id: Number,
    password: String,
    name: String,
    numMecanografico: String,
    email: String,
    type: String
}, {versionKey : false});

usersSchema.plugin(passportLocalMongoose);

module.exports  = mongoose.model('users', usersSchema)