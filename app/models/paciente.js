const mongoose = require('mongoose')
// Usamos o model para nomear a collection e inserir os objetos dela
const Paciente = mongoose.model('paciente', {
    nome: String,
    dataNascimento: Date,
    genero: String,
    enderecoCompleto: String,
    email: String,
    telefone: String,
    cpf: String,
    usuario: String,
    senha: String
})

module.exports = Paciente