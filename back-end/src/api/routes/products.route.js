const { Router } = require('express');
const { getAll } = require('../controllers/product.controller');
const { tokenValidation } = require('../middlewares/validateToken');

const productRoute = Router();

productRoute.get('/products', tokenValidation, getAll);

module.exports = productRoute;
