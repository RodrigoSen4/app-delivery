'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('products',
      [{
        id: 1,
        name: 'PlayStation 7',
        price: 20000,
        url_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDG1GJ7RNRgzBv27pJwXDBIgJoPqOEr-De9w&usqp=CAU',
      },
      {
        id: 2,
        name: 'teclado gamer',
        price: 200,
        url_image: 'https://cf.shopee.com.br/file/f298cce542de153cc4bec537c18c22ca',
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  },
};
