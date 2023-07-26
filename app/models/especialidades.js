const mongoose = require('mongoose')
// Usamos o model para nomear a collection ESPECIALIDADES e inserir os objetos dela
const Especialidade = mongoose.model('especialidade', {
    nome: String,
    dataDeCadastro: String,
})

module.exports = Especialidade