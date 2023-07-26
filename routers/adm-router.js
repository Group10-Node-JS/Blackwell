const { Router } = require('express')
const {Admin} = require('../middlewares/cargo')
const admController = require('../app/controllers/adm-controller')
const router = Router()

router.all('*', Admin)

router.get('/', admController.listagem)

router.get('/cadastroMedico', admController.cadastroMedicoGet)
router.post('/cadastroMedico', admController.cadastroMedicoPost)
router.get('/editarMedico/:id', admController.editarMedicoGet)
router.post('/editarMedico', admController.editarMedicoPost)
router.get('/deletarMedico/:id', admController.deletarMedico)
router.get('/medico/:id', admController.perfilMedicoGet)

router.get('/cadastroPaciente', admController.cadastroPacienteGet)
router.post('/cadastroPaciente', admController.cadastroPacientePost)
router.get('/editarPaciente/:id', admController.editarPacienteGet)
router.post('/editarPaciente', admController.editarPacientePost)
router.get('/deletarPaciente/:id', admController.deletarPaciente)

router.get('/listarEspecialidade', admController.listarEspecialidade)
router.post('/adicionarEspecialidade', admController.adicionarEspecialidade)
router.get('/deletarEspecialidade/:id', admController.deletarEspecialidade)
router.get('/buscarEspecialidade', admController.buscarEspecialidade)

router.get('/revogarAcesso/:auth', admController.revogarAcesso)


module.exports = router