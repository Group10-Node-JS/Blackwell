const mongoose = require('mongoose')
// Usamos o model para nomear a collection e inserir os objetos dela
const Paciente = mongoose.model('paciente', {
    nome: String,
    dataNascimento: String,
    genero: String,
    enderecoCompleto: String,
    email: String,
    telefone: String,
    cpf: String,
    usuario: String,
    senha: String,
    convenio: String,
    dataDeCadastro: String,
})

module.exports = Paciente