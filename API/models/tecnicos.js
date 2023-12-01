const mongoose = require('mongoose')

var tecnicoSchema = new mongoose.Schema({
    _id: Number,
    numMecanografico: String,
    email: String,
    password: String
});

module.exports = mongoose.model('tecnicos', tecnicoSchema)