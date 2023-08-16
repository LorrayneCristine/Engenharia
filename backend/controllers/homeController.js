// homeController.js

const Cuidador = require('../models/Cuidador');

exports.getCuidadoresHome = async (req, res) => {
  try {
    const cuidadores = await Cuidador.aggregate([{ $sample: { size: 3 } }]);
    res.status(200).json(cuidadores);
  } catch (error) {
    console.error('Erro ao buscar cuidadores aleatórios:', error);
    res.status(500).json({ error: 'Erro ao buscar cuidadores aleatórios' });
  }
};
