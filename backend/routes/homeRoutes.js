const { Router } = require('express');
const homeController = require('../controllers/HomeController');

const route = new Router();

route.get('/', homeController.index);
route.post('/', homeController.postCity);
route.get('/topcities', homeController.findTopCities);

module.exports = route;
