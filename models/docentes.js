const mongoose = require('mongoose')

var docenteSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    numMecanografico: String,
    email: String,
    password: String
});

module.exports  = mongoose.model('docentes', docenteSchema)