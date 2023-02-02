const { Router } = require('express');
const SaleController = require('../controllers/sale.controller');
const { tokenValidation } = require('../middlewares/validateToken');

const saleRouter = Router();

saleRouter.get('/sales', tokenValidation, SaleController.getOrder);

saleRouter.get('/sales/:id', tokenValidation, SaleController.getSaleById);

saleRouter.post('/sales', tokenValidation, SaleController.createSale);

saleRouter.put('/sales/:id', tokenValidation, SaleController.updateStatusSales);

module.exports = saleRouter;
