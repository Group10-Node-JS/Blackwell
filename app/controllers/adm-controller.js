const Medico = require('../models/medico')
const Paciente = require('../models/paciente')
const Especialidade = require('../models/especialidades')

exports.listagem = async (req, res) => {
  const medicos = await Medico.find({}).lean().exec()
  const pacientes = await Paciente.find({}).lean().exec()
  const especialidades = await Especialidade.find({}).lean().exec()
  
  return res.render('listagem', {medicosDados: JSON.stringify(medicos), pacientesDados: JSON.stringify(pacientes), especialidadesDados: JSON.stringify(especialidades), titulo: 'Admin - Backwell', style:'listagem'})
}

exports.perfilMedicoGet = async (req, res) => {
  const idMedico = req.params.id
  
  Medico.findById(idMedico, (erro, medico) => {
    if(erro) throw erro
    console.log(medico)
    res.render('painel-medico', {medico, style:'estilos', titulo: 'Painel Médico'})
  })
}

exports.editarMedico = async (req, res) => {
  const medicoEscolhido = await Medico.findById(req.params.id).exec()

  return res.render('inserir-medico', {medicoEscolhido, titulo: 'Editar Médico', style: 'estilos'})
}

exports.deletarMedico = async (req, res) => {
  await Medico.findByIdAndDelete(req.params.id).exec()

  return res.redirect('/admin/')
}

exports.editarPaciente = async (req, res) => {
  const pacienteEscolhido = await Paciente.findById(req.params.id).exec()

  return res.render('inserir-paciente', {pacienteEscolhido, titulo:'Editar Paciente', style:'form-validation'})
}

exports.deletarPaciente = async (req, res) => {
  await Paciente.findByIdAndDelete(req.params.id).exec()

  return res.redirect('/admin/')
}

// control para página de adicionar pacientes
exports.cadastroPacienteGet = (req, res) => {
  res.render('inserir-paciente', {style:"estilos", titulo: "Painel Paciente" } )
}


exports.cadastroPacientePost = async (req, res) => {
  const pacienteExistente = await Paciente.findOne({email: req.body.email, usuario: req.body.usuario, cpf: req.body.cpf}).exec()

  if(pacienteExistente != null) {
    return res.render('inserir-paciente', {mensagem: 'Usuário já existente', style: 'form-validation', titulo: 'Cadastro de Pacientes'})
  }

  const pacienteNovo = new Paciente()

  Object.assign(pacienteNovo, req.body)

  await pacienteNovo.save()

  return res.redirect('/admin/')
}

exports.cadastroMedicoGet = (req, res) => {
  res.render('inserir-medico', {style:"estilos", titulo: "Painel Médico" } )
}


exports.cadastroMedicoPost = async (req, res) => {
  const medicoExistente = await Medico.findOne({email: req.body.email, usuario: req.body.usuario, crm: req.body.crm}).exec()

  if(medicoExistente != null) {
    return res.render('inserir-medico', {mensagem: 'Médico já existente', style: 'form-validation', titulo: 'Cadastro de Médicos'})
  }

  const medicoNovo = new Medico()

  Object.assign(medicoNovo, req.body)

  await medicoNovo.save()

  return res.redirect('/admin/')
}