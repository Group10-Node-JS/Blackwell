const Paciente = require('../models/paciente')

exports.cadastroGet = (req, res) => {
  res.render('cadastro-paciente');
}

exports.cadastroPost = async (req, res) => {
  const pacienteExistente = await Paciente.findOne({email: req.body.email, usuario: req.body.usuario, cpf: req.body.cpf}).exec()

  if(pacienteExistente != null) {
    return res.render('cadastro-paciente', {mensagem: 'Usuário já existente'})
  }

  const pacienteNovo = new Paciente()

  // Testar Object assign

  Object.assign(pacienteNovo, req.body)

  await pacienteNovo.save()

  // Chamar middleware de usuario para registrar

  return res.redirect('/perfil')
}

exports.perfilGet = (req, res) => {
  res.render('painel-paciente');
}