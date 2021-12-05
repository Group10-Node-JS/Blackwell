const { Router } = require('express')
const {Admin} = require('../middlewares/cargo')
const admController = require('../app/controllers/adm-controller')
const router = Router()

router.all('*', Admin)

router.get('/', admController.listagem)

router.get('/cadastroMedico', admController.cadastroMedicoGet)

router.post('/cadastroMedico', admController.cadastroMedicoPost)

router.get('/cadastroPaciente', admController.cadastroPacienteGet)

router.post('/cadastroPaciente', admController.cadastroPacientePost)

router.get('/editarMedico/:id', admController.editarMedico)

router.get('/deletarMedico/:id', admController.deletarMedico)

router.get('/editarPaciente/:id', admController.editarPaciente)

router.get('/deletarPaciente/:id', admController.deletarPaciente)

router.get('/medico/:id', admController.perfilMedicoGet)


module.exports = router