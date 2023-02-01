const SaleService = require('../services/sales.service');

const createSale = async (req, res) => {
  const { products, saleInfo } = req.body;
  const { id } = req.payload;

  const newSale = await SaleService.createSale(id, products, saleInfo);
  return res.status(201).json(newSale);
};

// busca todas SALES de um usuario
const getOrder = async (req, res) => {
  const { id, role } = req.payload;

  const orders = await SaleService.getOrderById(id, role);

  return res.status(201).json(orders);
};

// busca SALE específico por SALE-ID
const getSaleById = async (req, res) => {
  const { id: userId, role } = req.payload;

  const { params: { id } } = req;

  const data = await SaleService.getSaleById(role, userId, id);
  
  return res.status(201).json(data);
};

const updateStatusSales = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  await SaleService.updateStatus(id, status);

  return res.status(201).json('ok');
};

module.exports = { createSale, getOrder, updateStatusSales, getSaleById };