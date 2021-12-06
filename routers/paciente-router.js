const { Router } = require('express')
const pacienteController = require('../app/controllers/paciente-controller')
const {User} = require('../middlewares/cargo')
const router = Router()

router.get('/cadastro', pacienteController.cadastroGet)

router.post('/cadastro', pacienteController.cadastroPost)

router.get('/perfil/:id', User, pacienteController.perfilGet)

module.exports = router