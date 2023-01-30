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
  console.log(user);
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

const registerAdm = async (userInfo) => {
  try {
    await service.post('/register/admin', userInfo);
    return {
      status: true,
    };
  } catch (err) {
    return { erro: 'erro', status: false };
  }
};

export { doLogin, registerUser, getAllProducts, getSellers, registerAdm };
