const { Router } = require('express');
const autenticacaoController = require('../app/controllers/autenticacao-controller')
const router = Router();

router.get('/', autenticacaoController.loginGet)

router.post('/', autenticacaoController.loginPost)

router.get('/sair', autenticacaoController.sair)

module.exports = router;