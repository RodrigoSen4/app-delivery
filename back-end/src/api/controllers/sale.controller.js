const SaleService = require('../services/sales.service');

const createSale = async (req, res) => {
  const { products, saleInfo } = req.body;
  const newSale = await SaleService.createSale(1, products, saleInfo);
  return res.status(200).json(newSale);
}

module.exports = { createSale };