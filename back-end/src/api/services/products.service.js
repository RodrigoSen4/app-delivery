const { Product } = require('../../database/models');

async function getProducts() {
  const data = await Product.findAll({ limit: 11 });
  return { status: 200, info: data };
}

module.exports = { getProducts };

/* const productsModel = require('../../database/models');
const getProducts = async () => {
  const products = await productsModel.findAll();
  if (!products || products.length === 0) {
    return {
      error: { message: 'Products not found' },
      code: 400,
    };
  }
  return { code: 200, data: products };
};
module.exports = { getProducts }; */
