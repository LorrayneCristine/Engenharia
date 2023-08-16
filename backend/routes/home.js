// cuidadorRoutes.js

const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController'); // Renomeie a importação

// Defina a rota para cuidadores aleatórios usando o homeController
router.get('/home', homeController.getCuidadoresHome);

module.exports = router;
