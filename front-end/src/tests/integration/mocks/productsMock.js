const product01 = {
  id: '1',
  name: 'cerveja-01',
  price: '3.00',
  urlImage: 'cerveja-01-url',
};
const product02 = {
  id: '2',
  name: 'cerveja-02',
  price: '9.00',
  urlImage: 'cerveja-02-url',
};

const product03 = {
  id: '3',
  name: 'cerveja-03',
  price: '15.00',
  urlImage: 'cerveja-03-url',
};

const productsArray = [
  product01,
  product02,
  product03,
];

const productsFromDb = {
  data: productsArray,
};

export { product01, product02, product03, productsArray, productsFromDb };
