const sale01 = {
  id: 1,
  userId: 1,
  sellerId: 2,
  totalPrice: '10.00',
  deliveryAddress: 'Avenida 10',
  deliveryNumber: '500',
  saleDate: '2023-02-02T19:21:42.000Z',
  status: 'Pendente'
};

const sale02 = {
  id: 2,
  userId: 1,
  sellerId: 2,
  totalPrice: '20.00',
  deliveryAddress: 'Avenida 10',
  deliveryNumber: '500',
  saleDate: '2023-02-02T19:21:42.000Z',
  status: 'Pendente'
};

const allFakeSales = [sale01, sale02];

module.exports = { allFakeSales };
