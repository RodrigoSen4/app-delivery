import { useState } from 'react';
import PropTypes from 'prop-types';
import { checkEmail, showMessage } from '../../helpers/helpers';
import { doLogin } from '../../API/requests';

const SIX = 6;

function LoginPage(props) {
  const { history } = props;
  const [message, setMessage] = useState('');
  const [userInfo, setUserInfo] = useState({ email: null, password: null });

  const login = async (info) => {
    if (!checkEmail(info.email)) return setMessage('Email inválido');

    if (!info.password || info.password.length < SIX) {
      return setMessage('Senha inválida');
    }

    const { data } = await doLogin(info);

    if (data) return setMessage(data.message);

    history.push('/products');
  };

  return (
    <div>
      <form>
        <label htmlFor="user-email">
          Email:
          <input
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
            type="password"
            id="user-password"
            onChange={ ({ target }) => {
              setUserInfo({ ...userInfo, password: target.value });
            } }
          />
        </label>
        <button type="button" onClick={ () => login(userInfo) }>
          Entrar
        </button>
        { message ? showMessage(message) : null }
      </form>
    </div>
  );
}

LoginPage.propTypes = {
  history: PropTypes.objectOf().isRequired,
};

export default LoginPage;
