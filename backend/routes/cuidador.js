const express = require("express");
const router = express.Router();

// Certifique-se de importar o middleware authenticateUser
//const { authenticateUser } = require("../app"); // Certifique-se de usar o caminho correto para o arquivo app.js

const upload = require("../config/multer");
const CuidadorController = require('../controllers/cuidadorController');

router.post('/', upload.fields([{ name: 'image1' }, { name: 'image2' }, { name: 'image3' }]), CuidadorController.create);



// Rota para buscar cuidadores com filtros
router.get('/buscar', CuidadorController.buscarCuidadores);

module.exports = router;
