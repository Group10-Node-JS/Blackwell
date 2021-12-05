const Medico = require('../models/medico')
const Paciente = require('../models/paciente')
const Especialidade = require('../models/especialidades')

exports.listagem = async (req, res) => {
  const medicos = await Medico.find({}).lean().exec()
  const pacientes = await Paciente.find({}).lean().exec()
  const especialidades = await Especialidade.find({}).lean().exec()
  
  return res.render('listagem', {medicosDados: JSON.stringify(medicos), pacientesDados: JSON.stringify(pacientes), especialidadesDados: JSON.stringify(especialidades), titulo: 'Admin - Backwell', style:'listagem'})
}

// Ser usado no modal
exports.cadastroMedicoPost = async (req, res) => {
  const medicoExistente = await Medico.findOne({email: req.body.email, usuario: req.body.usuario, crm: req.body.crm}).exec()

  if(medicoExistente != null) {
    return res.render('cadastro-medicos', {mensagem: 'Médico já existente', style: 'form-validation', titulo: 'Cadastro de Médicos'})
  }

  const medicoNovo = new Medico()

  Object.assign(medicoNovo, req.body)

  await medicoNovo.save()

  return res.render('cadastro-medicos', {mensagem: "Medico cadastrado", style: 'form-validation', titulo: 'Cadastro de Médicos'})
}

// Ser usado no modal
exports.cadastroPacientePost = async (req, res) => {
  const pacienteExistente = await Paciente.findOne({email: req.body.email, usuario: req.body.usuario, cpf: req.body.cpf}).exec()

  if(pacienteExistente != null) {
    return res.render('cadastro-pacientes', {mensagem: 'Usuário já existente', style: 'form-validation', titulo: 'Cadastro de Pacientes'})
  }

  const pacienteNovo = new Paciente()

  Object.assign(pacienteNovo, req.body)

  await pacienteNovo.save()

  return res.render('cadastro-pacientes', {mensagem: "Paciente cadastrado", style: 'form-validation', titulo: 'Cadastro de Pacientes'})
}

exports.perfilMedicoGet = async (req, res) => {
  const idMedico = req.params.id
  
  Medico.findById(idMedico, (erro, medico) => {
    if(erro) throw erro

    res.render('painel-medico', {medico, style:'estilos', titulo: 'Painel Médico'})
  })
}

exports.editarMedico = async (req, res) => {
  const medicoEscolhido = await Medico.findById(req.params.id).exec()

  return res.render('cadastro-medicos', {medicoEscolhido, titulo: 'Editar Médico', style: 'form-validation'})
}

exports.deletarMedico = async (req, res) => {
  await Medico.findByIdAndDelete(req.params.id).exec()

  return res.redirect('/admin/')
}

exports.editarPaciente = async (req, res) => {
  const pacienteEscolhido = await Paciente.findById(req.params.id).exec()

  return res.render('cadastro-pacientes', {pacienteEscolhido, titulo:'Editar Paciente', style:'form-validation'})
}

exports.deletarPaciente = async (req, res) => {
  await Paciente.findByIdAndDelete(req.params.id).exec()

  return res.redirect('/admin/')
}