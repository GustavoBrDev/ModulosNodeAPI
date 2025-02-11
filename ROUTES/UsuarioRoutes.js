const express = require('express');
const router = express.Router();
const usuariosController = require('../CONTROLLERS/UsuarioController.js');

router.get('/usuario/:id', usuariosController.listar);
router.get('/usuario', usuariosController.listar);
router.post('/usuario', usuariosController.criar);
router.put('/usuario/:id', usuariosController.atualizar);
router.delete('/usuario/:id', usuariosController.deletar);

module.exports = router;