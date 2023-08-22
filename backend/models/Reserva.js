const mongoose = require('mongoose');

const ReservaSchema = new mongoose.Schema({
    cpfcliente: { type: String, required: true },
    cpfcuidador:{ type: String, required: true },
    dateOfReserve: { type: Date, required: true },
    },
)


const Reserve = mongoose.model("Reserve", ReservaSchema)

module.exports = Reserve;