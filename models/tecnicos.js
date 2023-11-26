const mongoose = require('mongoose')

var tecnicoSchema = new mongoose.Schema({
    numMecanografico: String,
    email: String,
    password: String
});

module.exports = mongoose.model('tecnicos', tecnicoSchema)