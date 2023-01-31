import axios from 'axios';

const host = process.env.REACT_APP_HOSTNAME || 'localhost';
const port = process.env.REACT_APP_PORT || '3001';

const conn = `http://${host}:${port}`;

const service = axios.create({ baseURL: conn });

// O Axios está sendo usado para fazer as requisições ao back-end. Não é necessário configurar mais nada para se comunicar com o back, basta usar os métodos do axios e informar o endpoint e os dados, se forem necessários. Link da biblioteca ( https://axios-http.com/docs/intro )

const doLogin = async (userInfo) => {
  try {
    const { data } = await service.post('/login', { ...userInfo });
    localStorage.setItem('user', JSON.stringify(data));

    return {
      payload: data,
      status: true,
    };
  } catch (err) {
    return {
      payload: err.response.data,
      status: false,
    };
  }
};

const registerUser = async (userInfo) => {
  try {
    const { data } = await service.post('/register', userInfo);
    localStorage.setItem('user', JSON.stringify(data));
    return {
      payload: null,
      status: true,
    };
  } catch (err) {
    return {
      payload: err.response.data,
      status: false,
    };
  }
};

const getAllProducts = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { data } = await service.get('/products', {
    headers: {
      Authorization: user.token,
    },
  });
  return data;
};

const getSellers = async () => {
  const sellers = await service.get('/sellers');
  return sellers.data;
};

const postSale = async (sale) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const { data: { id } } = await service.post('/sales', sale, {
    headers: { Authorization: user.token },
  });

  return id;
};

const getSales = async () => {
  const user = JSON.parse(localStorage.getItem('user'));

  try {
    const { data } = await service.get(
      '/sales/',
      { headers: { Authorization: user.token } },
    );

    return { payload: data, status: true };
  } catch (err) {
    return { payload: err.response.data, status: false };
  }
};

const getSalesById = async (id) => {
  const user = JSON.parse(localStorage.getItem('user'));

  try {
    const resp = await service.get(
      `/sales/${id}`,
      { headers: { Authorization: user.token } },
    );

    return resp.data;
  } catch (err) {
    return { payload: err.response.data, status: false };
  }
};

export {
  doLogin,
  registerUser,
  getAllProducts,
  getSellers,
  postSale,
  getSales,
  getSalesById,
};
