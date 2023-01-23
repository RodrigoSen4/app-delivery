const { Router } = require('express');
const SaleController = require('../controllers/sale.controller');

const saleRouter = Router();

saleRouter.post('/sales', SaleController.createSale);

module.exports = saleRouter;

