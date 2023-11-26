
const mongoose = require('mongoose')

var alunoSchema = new mongoose.Schema({
    name: String,
    numMecanografico: String,
    email: String,
    password: String
});

module.exports = mongoose.model('alunos', alunoSchema)