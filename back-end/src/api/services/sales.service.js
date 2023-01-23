const { Product, Sale, SaleProduct } = require('../../database/models');

async function createSale(userId, products, saleInfo) {
  console.log(products);
  let totalPrice = 0;
  let getPrices = products.map(async (product) => {
    const productById = await Product.findOne({
      where: {
        id: product.productId,
      },
    });
    const productPrice = productById.price * product.quantity;
    totalPrice += productPrice;
  });

  getPrices = await Promise.all(getPrices);

  const obj = {
    userId,
    sellerId: 2,
    totalPrice,
    deliveryAddress: saleInfo.deliveryAddress,
    deliveryNumber: saleInfo.deliveryNumber,
    saleDate: new Date(),
    status: 'Pendente',
  }

  const newSale = await Sale.create(obj);

  let insertSaleProducts = products.map(async (product) => {
    const obj = {
      productId: product.productId,
      saleId: newSale.id,
      quantity: product.quantity,
    }
    await SaleProduct.create(obj);
  });

  insertSaleProducts = await Promise.all(insertSaleProducts);

  return newSale;
}

module.exports = { createSale };