const { Router } = require('express')
const pacienteController = require('../app/controllers/paciente-controller')
const router = Router()

router.get('/cadastro', pacienteController.cadastroGet)

router.post('/cadastro', pacienteController.cadastroPost)

router.get('/perfil', pacienteController.perfilGet)

module.exports = router