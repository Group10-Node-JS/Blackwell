const Paciente = require('../models/paciente')
const Medico = require('../models/medico')
const Especialidade = require('../models/especialidades')

exports.cadastroGet = (req, res) => {
  res.render('cadastro-pacientes', {titulo: 'Cadastro de Pacientes', style: 'form-validation'});
}

exports.cadastroPost = async (req, res) => {
  const dataAtual = new Date()

  const pacienteExistente = await Paciente.findOne({cpf: req.body.cpf}).exec()

  if(pacienteExistente != null) {
    return res.render('cadastro-pacientes', {mensagem: 'Usuário já existente', titulo: 'Cadastro de Pacientes', style: 'form-validation'})
  }

  const pacienteNovo = new Paciente()

  Object.assign(pacienteNovo, req.body)

  pacienteNovo.dataDeCadastro =  `${dataAtual.getFullYear()}-${dataAtual.getMonth() + 1}-0${dataAtual.getDate()}`

  await pacienteNovo.save()

  global.tipoUsuario = "USER"

  return res.redirect(`/perfil/${pacienteNovo._id}`)
}

exports.perfilGet = async (req, res) => {
  const id = req.params.id
  const paci = await Paciente.findById(id).exec()

  const medicos = await Medico.find({}).lean().sort({nome: 'asc'}).exec()
  const especialidades = await Especialidade.find({}).lean().sort({nome: 'asc'}).exec()

  res.render('painel-paciente', {paci, medicosDados: JSON.stringify(medicos), especialidades, titulo:"Meu Perfil", style:"listagem"});
}