import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { checkEmail, checkUserInfo, showMessage } from '../../helpers/helpers';
import { doLogin } from '../../API/requests';

const SIX = 6;

function LoginPage(props) {
  const { history } = props;
  const [message, setMessage] = useState('');
  const [userInfo, setUserInfo] = useState({ email: null, password: null });

  const goToProducts = async () => {
    const user = localStorage.getItem('user');

    if (!user || !JSON.parse(user).token) return null;

    return history.push('/customer/products');
  };

  const login = async (info) => {
    if (!checkEmail(info.email)) return setMessage('Email inválido');

    if (!info.password || info.password.length < SIX) return setMessage('Senha inválida');

    const { payload, status } = await doLogin(info);

    if (!status) return setMessage(payload);

    history.push('/customer/products');
  };

  useEffect(() => {
    goToProducts();
  }, []);

  return (
    <div>
      <form>
        <label htmlFor="user-email">
          Email:
          <input
            data-testid="common_login__input-email"
            type="text"
            id="user-email"
            onChange={ ({ target }) => {
              setUserInfo({ ...userInfo, email: target.value });
            } }
          />
        </label>
        <label htmlFor="user-password">
          Senha:
          <input
            data-testid="common_login__input-password"
            type="password"
            id="user-password"
            onChange={ ({ target }) => {
              setUserInfo({ ...userInfo, password: target.value });
            } }
          />
        </label>
        <button
          data-testid="common_login__button-login"
          type="button"
          disabled={ !checkUserInfo(userInfo) }
          onClick={ () => login(userInfo) }
        >
          Entrar
        </button>
        <button
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
