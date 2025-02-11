const express = require('express');
const router = express.Router();
const awsController = require('../CONTROLLERS/AWSController.js');

router.get('/aws/:id', awsController.pegarImaggem);
module.exports = router;