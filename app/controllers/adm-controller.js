const Medico = require('../models/medico')
const Paciente = require('../models/paciente')
const Especialidade = require('../models/especialidades')

// -------------LISTAGEM DE medicos, pacientes e especialidades--------------
exports.listagem = async (req, res) => {
  const medicos = await Medico.find({}).lean().sort({nome: 'asc'}).exec()
  const pacientes = await Paciente.find({}).lean().sort({nome: 'asc'}).exec()
  const especialidades = await Especialidade.find({}).lean().sort({nome: 'asc'}).exec()
  
  return res.render('listagem', {medicosDados: JSON.stringify(medicos), pacientesDados: JSON.stringify(pacientes), especialidadesDados: JSON.stringify(especialidades), especialidades, titulo: 'Admin - Backwell', style:'listagem'})
}

///////////////////////////////////////////////////////////////
//////////////////MÉTODOS PARA MÉDICOS/////////////////////////
///////////////////////////////////////////////////////////////

// ---------------Adicionar perfil do médico----------------------
exports.perfilMedicoGet = async (req, res) => {
  const idMedico = req.params.id
  
  Medico.findById(idMedico, (erro, medico) => {
    if(erro) throw erro
    console.log(medico)
    res.render('painel-medico', {medico, style:'estilos', titulo: 'Painel Médico'})
  })
}
// ---------------Editar Médico GET------------------------------
exports.editarMedicoGet = async (req, res) => {
  const medicoEscolhido = await Medico.findById(req.params.id).exec()

  return res.render('atualizar-medico', {medicoEscolhido, titulo: 'Editar Médico', style: 'estilos'})
}
// ---------------Editar Médico POST------------------------------
exports.editarMedicoPost = async (req, res) => {
  const medicoAtualizado = req.body

  await Medico.findByIdAndUpdate({_id:req.body.id}, medicoAtualizado)
  return res.redirect('/admin/')
}
// ---------------Deletar Médico DELETE------------------------------
exports.deletarMedico = async (req, res) => {
  await Medico.findByIdAndDelete(req.params.id).exec()

  return res.redirect('/admin/')
}
// ---------------Cadastrar Médico GET------------------------------
exports.cadastroMedicoGet = async (req, res) => {
	const especialidades = await Especialidade.find({}).lean().sort({nome: 'asc'}).exec()
  
	return res.render('inserir-medico', {especialidades, style:"estilos", titulo: "Painel Médico" } )
}
// ---------------Cadastrar Médico POST------------------------------
exports.cadastroMedicoPost = async (req, res) => {
	const dataAtual = new Date()
	const medicoExistente = await Medico.findOne({crm: req.body.crm}).exec()
  
	if(medicoExistente != null) {
	  return res.render('inserir-medico', {style: 'form-validation', titulo: 'Cadastro de Médicos'})
	}
	const medicoNovo = new Medico()
	Object.assign(medicoNovo, req.body)
  
	medicoNovo.dataDeCadastro =  `${dataAtual.getFullYear()}-${dataAtual.getMonth() + 1}-0${dataAtual.getDate()}`
  
	await medicoNovo.save()
	return res.redirect('/admin/')
}



///////////////////////////////////////////////////////////////
//////////////////MÉTODOS PARA PACIENTES///////////////////////
///////////////////////////////////////////////////////////////

// ---------------Editar Paciente GET------------------------------
exports.editarPacienteGet = async (req, res) => {
  const pacienteEscolhido = await Paciente.findById(req.params.id).exec()

  return res.render('atualizar-paciente', {pacienteEscolhido, titulo:'Editar Paciente', style:'form-validation'})
}
// ---------------Editar Paciente POST------------------------------
exports.editarPacientePost = async (req, res) => {
  const pacienteAtualizado = req.body

  await Paciente.findByIdAndUpdate({_id:req.body.id}, pacienteAtualizado)

  return res.redirect('/admin/')
}
// ---------------Deletar Paciente DELETE------------------------------
exports.deletarPaciente = async (req, res) => {
  await Paciente.findByIdAndDelete(req.params.id).exec()

  return res.redirect('/admin/')
}
// ---------------Cadastrar Paciente GET------------------------------
exports.cadastroPacienteGet = (req, res) => {
  res.render('inserir-paciente', {style:"estilos", titulo: "Painel Paciente" } )
}
// ---------------Cadastrar Paciente POST------------------------------
exports.cadastroPacientePost = async (req, res) => {
  const dataAtual = new Date()

  const pacienteExistente = await Paciente.findOne({cpf: req.body.cpf}).exec()

  if(pacienteExistente != null) {
    return res.render('inserir-paciente', {mensagem: 'Usuário já existente', style: 'form-validation', titulo: 'Cadastro de Pacientes'})
  }

  const pacienteNovo = new Paciente()

  Object.assign(pacienteNovo, req.body)

  pacienteNovo.dataDeCadastro =  `${dataAtual.getFullYear()}-${dataAtual.getMonth() + 1}-0${dataAtual.getDate()}`

  await pacienteNovo.save()

  return res.redirect('/admin/')
}

///////////////////////////////////////////////////////////////
//////////////////MÉTODOS PARA ESPECIALIDADES//////////////////
///////////////////////////////////////////////////////////////

// ---------------Listar Especialidades------------------------------
exports.listarEspecialidade = async (req,res) =>{
 const especialidades = await Especialidade.find({}).sort({nome: 'asc'}).exec() 
 return res.render('especialidade',{especialidades:JSON.stringify(especialidades),style:"listagem"})
}
// ---------------Adicionar Especialidade------------------------------
exports.adicionarEspecialidade = async (req,res) =>{
  const dataAtual = new Date()

  const especialidadeExistente = await Especialidade.findOne({nome: req.body.nome}).lean().exec()

  if(especialidadeExistente != null) {
    return res.redirect('/admin/listarEspecialidade')
  }

  const especialidade = String(req.body.nome);
  const especialidadeSerial = especialidade.charAt(0).toUpperCase() + especialidade.substring(1);

  const especialidadeDados = {
    nome: especialidadeSerial,
    dataDeCadastro: `${dataAtual.getFullYear()}-${dataAtual.getMonth() + 1}-0${dataAtual.getDate()}`
  }

  const novaEspecialidade = new Especialidade();

  Object.assign(novaEspecialidade, especialidadeDados)

  await novaEspecialidade.save()  

  return res.redirect('/admin/listarEspecialidade')
}
// ---------------Editar Especialidade------------------------------
exports.editarEspecialidade = async (req, res) => {
  return res.redirect('/admin/listarEspecialidade')
}
// ---------------Deletar Especialidade------------------------------
exports.deletarEspecialidade = async (req, res) => {
  await Especialidade.findByIdAndDelete(req.params.id)
  return res.redirect('/admin/listarEspecialidade')
}
// ---------------Buscar Especialidade------------------------------
exports.buscarEspecialidade = async (req, res) => {
  const nomeDaEspecialidade = req.query.nome
  const nomeDaEspecialidadeRegex = new RegExp(nomeDaEspecialidade, "i")

  const especialidadesPesquisadas =  await Especialidade.find({nome: nomeDaEspecialidadeRegex}).sort({nome: 'asc'}).exec()

  res.render('especialidade', {especialidades:JSON.stringify(especialidadesPesquisadas),style:"listagem"})
}
// --------------------Revogar Acesso------------------------------
exports.revogarAcesso = async (req, res) => {
  const bloqueio = req.params.auth

  if(bloqueio == 'true') {
    global.tipoUsuario = ""
  } else {
    global.tipoUsuario = "USER"
  }

  return res.end()
}