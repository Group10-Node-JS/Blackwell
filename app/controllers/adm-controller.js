const Medico = require('../models/medico')
const Paciente = require('../models/paciente')
const Especialidade = require('../models/especialidades')

exports.listagem = async (req, res) => {
  const medicos = await Medico.find({}).exec()
  const pacientes = await Paciente.find({}).exec()
  const especialidades = await Especialidade.find({}).exec()

  res.render('listagem', {medicos, pacientes, especialidades, style:'listagem'})
}

exports.cadastroMedicoGet = async (req, res) => {
  res.render('cadastro-medico')
}

exports.cadastroMedicoPost = async (req, res) => {
  const medicoExistente = await Medico.findOne({email: req.body.email, usuario: req.body.usuario, crm: req.body.crm}).exec()

  if(medicoExistente != null) {
    return res.render('cadastro-paciente', {mensagem: 'Médico já existente'})
  }

  const medicoNovo = new Medico()

  // Testar Object assign

  Object.assign(medicoNovo, req.body)

  await medicoNovo.save()

  // Chamar middleware de usuario para registrar

  return res.render('/cadastro-medico', {mensagem: "Medico cadastrado"})
}

exports.cadastroPacienteGet = async (req, res) => {
  res.render('cadastro-paciente')
}

exports.cadastroPacientePost = async (req, res) => {
  const pacienteExistente = await Paciente.findOne({email: req.body.email, usuario: req.body.usuario, cpf: req.body.cpf}).exec()

  if(pacienteExistente != null) {
    return res.render('cadastro-paciente', {mensagem: 'Usuário já existente'})
  }

  const pacienteNovo = new Paciente()

  // Testar Object assign

  Object.assign(pacienteNovo, req.body)

  await pacienteNovo.save()

  // Chamar middleware de usuario para registrar

  return res.render('/cadastro-paciente', {mensagem: "Paciente cadastrado"})
}

exports.perfilMedicoGet = async (req, res) => {
  const idMedico = req.params.id
  
  Medico.findById(idMedico, (erro, medico) => {
    if(erro) throw erro

    res.render('painel-medico', {medico})
  })
}