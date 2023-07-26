// Importar os módulos necessários
const mongoose = require('mongoose');

// Conectar ao MongoDB Atlas
mongoose.connect('mongodb+srv://<username>:<password>@<cluster-url>/<database>', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conexão com o MongoDB Atlas estabelecida'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB Atlas:', err));

// Definir o Schema para a collection "Users"
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
    unique: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

// Definir o Schema para a collection "Posts"
const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

// Definir o Schema para a collection "Reviews"
const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  adminResponse: {
    type: String,
  },
});

// Criar o modelo User com base no Schema
const User = mongoose.model('User', userSchema);

// Criar o modelo Post com base no Schema
const Post = mongoose.model('Post', postSchema);

// Criar o modelo Review com base no Schema
const Review = mongoose.model('Review', reviewSchema);

// Exportar os modelos
module.exports = {
  User,
  Post,
  Review,
};
