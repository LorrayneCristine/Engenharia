// Importar os módulos necessários
const mongoose = require('mongoose');

// Definir o Schema para a collection "Admins"
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
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
  content: {
    type: String,
    required: true,
  },
});

// Definir o Schema para a collection "Reviews"
const reviewSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  response: {
    type: String,
  },
});

// Definir o Schema para a collection "Payments"
const paymentSchema = new mongoose.Schema({
  // Propriedades do pagamento
});

// Definir o Schema para a collection "Reservations"
const reservationSchema = new mongoose.Schema({
  // Propriedades da reserva
});

// Criar o modelo Admin com base no Schema
const Admin = mongoose.model('Admin', adminSchema);

// Criar o modelo Post com base no Schema
const Post = mongoose.model('Post', postSchema);

// Criar o modelo Review com base no Schema
const Review = mongoose.model('Review', reviewSchema);

// Criar o modelo Payment com base no Schema
const Payment = mongoose.model('Payment', paymentSchema);

// Criar o modelo Reservation com base no Schema
const Reservation = mongoose.model('Reservation', reservationSchema);

// Exportar os modelos
module.exports = {
  Admin,
  Post,
  Review,
  Payment,
  Reservation,
};
