'use strict';

module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('sales_products', [], {});
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('sales_products', null, {});
  }
};
