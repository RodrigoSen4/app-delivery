const { Product, Sale, SaleProduct } = require('../../database/models');

async function createSale(userId, products, saleInfo) {
  let totalPrice = 0;
  await Promise.all(products.map(async (product) => {
    const productById = await Product.findOne({ where: { id: product.productId } });
    const productPrice = productById.price * product.quantity;
    totalPrice += productPrice;
  }));
  const obj = {
    userId, sellerId: 2, totalPrice, ...saleInfo, saleDate: new Date(), status: 'Pendente',
  };
  const newSale = await Sale.create(obj);
  await Promise.all(products.map(async (product) => {
    const obj2 = { productId: product.productId, saleId: newSale.id, quantity: product.quantity };
    await SaleProduct.create(obj2);
  }));
  return newSale;
}

module.exports = { createSale };