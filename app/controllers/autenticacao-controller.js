const Adm = require('../models/adm');
const Paciente = require('../models/paciente');

exports.loginGet = (req, res) => {
  res.render('login')
}

exports.loginPost = async (req, res) => {
  const paciente = await Paciente.findOne({usuario: req.body.usuario, senha: req.body.senha}).exec();
  
  if(paciente != null) {
    // Chamar middleware de usuario para registrar

    return res.redirect('/perfil')
  }

  const admin = await Adm.findOne({usuario: req.body.usuario, senha: req.body.senha}).exec();
    
  if(admin != null) {
    // Chamar middleware de admin para registrar

    return res.redirect('/admin/')
  }
  
  return res.render('login', {mensagem: 'Usuário não encontrado'})
}

exports.sair = async (req, res) => {
  // Apagar o registro do middleware

  res.redirect('/')
}