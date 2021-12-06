const Paciente = require('../models/paciente')

exports.cadastroGet = (req, res) => {
  res.render('cadastro-pacientes', {titulo: 'Cadastro de Pacientes', style: 'form-validation'});
}

exports.cadastroPost = async (req, res) => {
  const pacienteExistente = await Paciente.findOne({email: req.body.email, usuario: req.body.usuario, cpf: req.body.cpf}).exec()

  if(pacienteExistente != null) {
    return res.render('cadastro-pacientes', {mensagem: 'Usuário já existente', titulo: 'Cadastro de Pacientes', style: 'form-validation'})
  }

  const pacienteNovo = new Paciente()

  Object.assign(pacienteNovo, req.body)

  await pacienteNovo.save()

  global.tipoUsuario = "USER"

  return res.redirect(`/perfil/${pacienteNovo._id}`)
}

exports.perfilGet = async (req, res) => {
  const id = req.params.id
  const paci = await Paciente.findById(id).exec()
  res.render('painel-paciente', {paci});
}