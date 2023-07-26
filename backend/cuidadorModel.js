// Importar os módulos necessários
const mongoose = require('mongoose');

// Conectar ao MongoDB Atlas
mongoose.connect('mongodb+srv://<username>:<password>@<cluster-url>/<database>', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conexão com o MongoDB Atlas estabelecida'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB Atlas:', err));

// Definir o Schema para a collection "Cuidadores"
const cuidadorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  localizacao: {
    type: String,
    required: true,
  },
  imagens: [String],
  contato: {
    type: String,
    required: true,
  },
  especialidades: [String],
  valores: {
    type: Number,
    required: true,
  },
  animaisAceitos: [String],
  disponibilidade: [Date],
  interrupcao: {
    type: Boolean,
    default: false,
  },
  servicosRealizados: {
    type: [String],
    default: [],
  },
});

// Definir o Schema para a collection "Agendamentos"
const agendamentoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cuidadorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cuidador',
    required: true,
  },
  data: {
    type: Date,
    required: true,
  },
  comprovantePagamento: {
    type: String,
    required: true,
  },
});

// Criar os modelos com base nos Schemas
const Cuidador = mongoose.model('Cuidador', cuidadorSchema);
const Agendamento = mongoose.model('Agendamento', agendamentoSchema);

// Exportar os modelos
module.exports = {
  Cuidador,
  Agendamento,
};
