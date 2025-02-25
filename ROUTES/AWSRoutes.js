const express = require('express');
const router = express.Router();
const awsController = require('../CONTROLLERS/AWSController.js');

router.post('/aws', awsController.criarImagem);
router.get('/aws/:id', awsController.pegarImagem);
router.get('/aws/baixar/:arquivoNome', awsController.pegarImagemDaAws);

module.exports = router;