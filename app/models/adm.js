const mongoose = require('mongoose')
// Usamos o model para nomear a collection e inserir os objetos dela
const Adm = mongoose.model('adm', {
    usuario: String,
    senha: String
})

module.exports = Adm