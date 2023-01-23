const { getProducts } = require('../services/products.service');

const getAll = async (_req, res) => {
  try {
    const { status, info } = await getProducts();
    return res.status(status).json(info);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

module.exports = {
  getAll,
};
