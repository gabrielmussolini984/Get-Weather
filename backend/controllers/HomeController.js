const axios = require('axios');
const homeModel = require('../models/HomeModel');
require('dotenv').config();

const index = (req, res) => {
  res.json('teste');
};

const postCity = async (req, res) => {
  const { city } = req.body;
  try {
    const weather = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_KEY}&lang=pt_br`);
    homeModel.insert(weather.data);
    res.json(weather.data);
  } catch (error) {
    res.json('error');
  }
};

const findTopCities = async (req, res) => {
  try {
    const arrayCities = await homeModel.findCities();
    return res.json(arrayCities);
  } catch (error) {
    return res.json('error');
  }
};
module.exports = {
  index,
  postCity,
  findTopCities,
};
