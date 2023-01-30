import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { checkEmail, checkUserInfo, showMessage } from '../../helpers/helpers';
import { doLogin } from '../../API/requests';
import '../../styles/LoginPage.css';
import drinks from '../../images/drinks.gif';

const SIX = 6;

function LoginPage(props) {
  const { history } = props;
  const [message, setMessage] = useState('');
  const [userInfo, setUserInfo] = useState({ email: null, password: null });

  const goToProducts = async () => {
    const user = localStorage.getItem('user');

    if (!user || !JSON.parse(user).token) return null;

    if (JSON.parse(user).role === 'seller') {
      history.push('/seller/orders');
    } else {
      history.push('/customer/products');
    }
  };

  const login = async (info) => {
    if (!checkEmail(info.email)) return setMessage('Email inválido');

    if (!info.password || info.password.length < SIX) return setMessage('Senha inválida');

    const { payload, status } = await doLogin(info);

    if (!status) return setMessage(payload);

    if (payload.role === 'seller') {
      history.push('/seller/orders');
    } else {
      history.push('/customer/products');
    }
  };

  useEffect(() => {
    goToProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-login">
      <div className="container-title-img">
        <h1 className="title">Fast Drinks</h1>
        <img src={ drinks } className="img-drinks" alt="" />
      </div>
      <form className="form-login">
        <h2>Login</h2>
        <div className="inputs-login">
          <label htmlFor="user-email">
            <input
              placeholder="E-mail"
              data-testid="common_login__input-email"
              type="text"
              id="user-email"
              onChange={ ({ target }) => {
                setUserInfo({ ...userInfo, email: target.value });
              } }
            />
          </label>
          <label htmlFor="user-password">
            <input
              placeholder="Senha"
              data-testid="common_login__input-password"
              type="password"
              id="user-password"
              onChange={ ({ target }) => {
                setUserInfo({ ...userInfo, password: target.value });
              } }
            />
          </label>
        </div>
        <button
          className="login-button"
          data-testid="common_login__button-login"
          type="button"
          disabled={ !checkUserInfo(userInfo) }
          onClick={ () => login(userInfo) }
        >
          Entrar
        </button>
        <button
          className="not-registered"
          data-testid="common_login__button-register"
          type="button"
          onClick={ () => history.push('/register') }
        >
          Ainda não tenho conta
        </button>
        { message
          ? showMessage(message, 'common_login__element-invalid-email')
          : null }
      </form>
    </div>
  );
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default LoginPage;
