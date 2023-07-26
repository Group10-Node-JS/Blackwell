const Adm = require('../models/adm');
const Paciente = require('../models/paciente');

///////////////////////////////////////////////////////////////
//////////////////MÉTODOS PARA LOGIN///////////////////////////
///////////////////////////////////////////////////////////////

// ---------------------LOGIN GET------------------------------
exports.loginGet = (req, res) => {
  res.render('login', {titulo: 'Blackwell', style: 'login'})
}
// ---------------------LOGIN POST------------------------------
exports.loginPost = async (req, res) => {
  const paciente = await Paciente.findOne({usuario: req.body.usuario, senha: req.body.senha}).exec();
  
  if(paciente != null) {
    global.tipoUsuario = "USER"

    return res.redirect(`/perfil/${paciente._id}`)
  }

  const admin = await Adm.findOne({usuario: req.body.usuario, senha: req.body.senha}).exec();
    
  if(admin != null) {
    global.tipoUsuario = "ADM"

    return res.redirect('/admin/')
  }
  
  return res.render('login', {mensagem: 'Usuário não encontrado', titulo: 'Blackwell', style: 'login'})
}
// ---------------------LOGOUT------------------------------
exports.sair = async (req, res) => {
  global.tipoUsuario = ""

  res.redirect('/')
}