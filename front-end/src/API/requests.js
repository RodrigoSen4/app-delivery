import axios from 'axios';

const host = process.env.REACT_APP_HOSTNAME || 'localhost';
const port = process.env.REACT_APP_PORT || '3001';

const conn = `http://${host}:${port}`;

const service = axios.create({ baseURL: conn });

const getAllProducts = async () => {
  const { data } = await service.get('/products');
  return data;
};

const test = (item) => {
  console.log(item);
};

export { getAllProducts, test };
