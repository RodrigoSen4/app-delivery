const { Router } = require('express');
const { getAll } = require('../controllers/product.controller');

const productRoute = Router();

productRoute.get('/products', getAll);

module.exports = productRoute;
