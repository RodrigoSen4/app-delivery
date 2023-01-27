const { Router } = require('express');
const SaleController = require('../controllers/sale.controller');
const { tokenValidation } = require('../middlewares/validateToken');

const saleRouter = Router();

saleRouter.post('/sales', tokenValidation, SaleController.createSale);

saleRouter.get('/sales', tokenValidation, SaleController.getOrder);

module.exports = saleRouter;
