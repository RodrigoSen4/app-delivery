'use strict';

module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('sales_products', [
      { sale_id: 1, product_id: 1, quantity: 10 },
      { sale_id: 2, product_id: 2, quantity: 5 },
    ], {});
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('sales_products', null, {});
  }
};
