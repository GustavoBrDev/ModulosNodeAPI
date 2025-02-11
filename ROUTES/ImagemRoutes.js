const express = require('express');
const router = express.Router();
const imagemController = require('../CONTROLLERS/ImagemController.js');

router.get('/imagem/:id', imagemController.listar);
router.get('/imagem', imagemController.listar);
router.post('/imagem', imagemController.criar);
router.put('/imagem/:id', imagemController.atualizar);
router.delete('/imagem/:id', imagemController.deletar);

module.exports = router;