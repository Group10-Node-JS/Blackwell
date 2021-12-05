const mongoose = require('mongoose')
// Usamos o model para nomear a collection e inserir os objetos dela
const Especialidade = mongoose.model('especialidade', {
    nome: String
})

module.exports = Especialidade