const mongoose = require('mongoose')
// Usamos o model para nomear a collection e inserir os objetos dela
const Medico = mongoose.model('medico', {
    nome: String,
    genero: String,
    enderecoCompleto: String,
    email: String,
    telefone: String,
    crm: String,
    especialidades: Array,
    dataDeCadastro: String,
})

module.exports = Medico