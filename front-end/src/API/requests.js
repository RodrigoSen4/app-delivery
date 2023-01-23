import axios from 'axios';

const host = process.env.REACT_APP_HOSTNAME || 'localhost';
const port = process.env.REACT_APP_PORT || '3001';

const conn = `http://${host}:${port}`;

const service = axios.create({ baseURL: conn });

const doLogin = async (userInfo) => {
  const { data } = await service.post('/login', userInfo);

  if (!data) return { message: data.message };

  return data;
};

const getAllProducts = async () => {
  const { data } = await service.get('/products');
  return data;
};

export { doLogin, getAllProducts };
