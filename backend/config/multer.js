const multer = require ("multer")

const path = require ("path")

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads/")
    },
    filename: function(req, file, cb){
        cb(null, Date.now()+ path.extname(file.originalname))
    },
})

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      // Verificar o tipo do arquivo, se é uma imagem ou não (opcional)
      if (file.mimetype.startsWith("image/")) {
        cb(null, true);
      } else {
        cb(new Error("Only images are allowed."));
      }
    },
  });
module.exports = upload; 