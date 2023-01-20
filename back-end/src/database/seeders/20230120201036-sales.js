'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('sales',
      [{
        id: 1,
        user_id: 1,
        seller_id: 2,
        total_price: 200000,
        delivery_address: 'Av. 10',
        delivery_number: 'Casa 10',
        sale_date: '2011-08-01T19:58:00.00',
        status: 'pendente',
      },
      {
        id: 2,
        user_id: 1,
        seller_id: 2,
        total_price: 1000,
        delivery_address: 'Av. 10',
        delivery_number: 'Casa 10',
        sale_date: '2011-08-01T21:58:00.00',
        status: 'entregue',
      }], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('sales', null, {});
  },
};
