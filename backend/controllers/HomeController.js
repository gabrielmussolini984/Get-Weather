const index = (req, res) => {
  res.json('teste');
};

const postCity = (req, res) => {
  const { city } = req.body;

  res.json('Dados Inseridos no Banco');
};

module.exports = {
  index,
  postCity,
};
