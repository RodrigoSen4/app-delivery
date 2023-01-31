const { Sale, Product, SaleProduct, User } = require('../../database/models');

async function createSale(userId, products, saleInfo) {
  const obj = { userId, ...saleInfo, saleDate: new Date(), status: 'Pendente' };

  const newSale = await Sale.create(obj);

  await Promise.all(products.map(async (product) => {
    const obj2 = { productId: product.productId, saleId: newSale.id, quantity: product.quantity };
    await SaleProduct.create(obj2);
  }));
  
  return newSale;
}

async function getOrderById(id, role) {
 if (role === 'seller') {
  const orders = await Sale.findAll({ where: { sellerId: id } });
  return orders;
  }

  const orders = await Sale.findAll({ where: { userId: id } });
  return orders;
}

const getSaleById = async (role, userId, id) => {
  
  const data = await Sale.findOne({
    include: [
    //   {
    //   model: Product,
    //   as: 'products',
    //   through: { attributes: ['quantity'] },
    // },
    {
      model: User,
      as: 'seller',
    }],
  where: role === 'customer' ? { userId, id } : { sellerId: userId, id },
  });
    return data;
};

async function updateStatus(id, status) {
  await Sale.update({ status }, { where: { id } });
}
module.exports = { createSale, getOrderById, updateStatus, getSaleById };