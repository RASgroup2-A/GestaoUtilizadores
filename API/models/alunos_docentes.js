const mongoose = require('mongoose')

var alunodocenteSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    numMecanografico: String,
    email: String,
    password: String,
    type: String
});

module.exports  = mongoose.model('alunos_docentes', alunodocenteSchema)