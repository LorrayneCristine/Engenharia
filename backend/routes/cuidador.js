const express = require ("express")
const router = express.Router()

const upload = require("../config/multer")
const  CuidadorController = require ('../controllers/cuidadorController')

router.post('/', upload.fields([{ name: 'image1' }, { name: 'image2' }, { name: 'image3' }]), CuidadorController.create);

module.exports = router;