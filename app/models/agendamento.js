const mongoose = require('mongoose')
// Usamos o model para nomear a collection e inserir os objetos dela
const Agendamento = mongoose.model('agendamento', {
    nomePaciente: String,
    nomeMedico: String,
    idPaciente: mongoose.Types.ObjectId,
    idMedico: mongoose.Types.ObjectId,
    hora: String,
    data: Date,
    status: String,
})

module.exports = Agendamento