const { Sale, SaleProduct } = require('../../database/models');

async function createSale(userId, products, saleInfo) {
  const obj = { userId, ...saleInfo, saleDate: new Date(), status: 'Pendente' };

  const newSale = await Sale.create(obj);

  await Promise.all(products.map(async (product) => {
    const obj2 = { productId: product.productId, saleId: newSale.id, quantity: product.quantity };
    await SaleProduct.create(obj2);
  }));
  
  return newSale;
}

async function getOrderById(id) {
  const orders = await Sale.findAll({ where: { userId:  id  } });
  console.log(orders)
  return orders;
}

module.exports = { createSale, getOrderById };