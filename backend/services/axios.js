const axios = require('axios');
require('dotenv');

async function getApi(city) {
  const jsonn = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`);
  console.log(jsonn);
}

module.exports = getApi;
