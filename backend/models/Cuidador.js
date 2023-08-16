const mongoose = require('mongoose');

const Schema = mongoose.Schema

const CuidadorSchema = new Schema({
    src: { type: [String], required: true } ,// Alterado para um array de Strings

    email: { type: String, required: true },
    password: { type: String, required: true },
    cpf: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    capabilitiesHistory: { type: String, required: true },
    dailyServicePrice: { type: String, required: true },
    weeklyServicePrice: { type: String, required: true },
    nameOrganization: { type: String, required: true },
    animalTypes: {
        dogs: { type: Boolean, default: false },
        cats: { type: Boolean, default: false },
        birds: { type: Boolean, default: false },
      },
    servicesIncluded: {
      passeio: { type: Boolean, default: false },
      banho: { type: Boolean, default: false },
      alimentacao: { type: Boolean, default: false },
    },
    address: { type: String, required: true },     // Endereço do cuidador
    numberHome: { type: String, required: true },  // Número da residência
    city: { type: String, required: true },        // Cidade onde está localizado o cuidador
    state: { type: String, required: true },       // Estado onde está localizado o cuidador
    country: { type: String, required: true },     // País onde está localizado o cuidador

    },
)

module.exports = mongoose.model("Cuidador", CuidadorSchema)