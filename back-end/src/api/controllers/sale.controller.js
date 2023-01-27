const SaleService = require('../services/sales.service');

const createSale = async (req, res) => {
  const { products, saleInfo } = req.body;
  const { userId } = req.payload;

  const newSale = await SaleService.createSale(userId, products, saleInfo);
  return res.status(201).json(newSale);
};

const getOrder = async (req, res) => {
  
  const { userId } = req.payload;

  const orders = await SaleService.getOrderById(userId);

  return res.status(201).json(orders);
};

module.exports = { createSale, getOrder };