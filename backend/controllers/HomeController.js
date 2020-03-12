const getCity = require('../services/axios');

const index = (req, res) => {
  res.json('teste');
};

const postCity = (req, res) => {
  const { city } = req.body;

  console.log(getCity(city));
  res.json('Dados Inseridos no Banco');
};

module.exports = {
  index,
  postCity,
};
