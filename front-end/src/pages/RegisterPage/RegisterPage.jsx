import { useState } from 'react';
import PropTypes from 'prop-types';
import { checkUserInfo, showMessage } from '../../helpers/helpers';
import { registerUser } from '../../API/requests';

const TWELVE = 12;

function RegisterPage(props) {
  const { history } = props;
  const [message, setMessage] = useState('');
  const [userInfo, setUserInfo] = useState({ email: null, password: null });

  const register = async () => {
    const data = await registerUser(userInfo);

    if (typeof data === 'boolean') return history.push('/customer/products');
    return setMessage(data.payload);
  };

  return (
    <div>
      <form>
        <label htmlFor="user-name">
          Nome:
          <input
            data-testid="common_register__input-name"
            type="text"
            id="user-name"
            onChange={ ({ target }) => {
              setUserInfo({ ...userInfo, name: target.value });
            } }
          />
        </label>
        <label htmlFor="user-email">
          Email:
          <input
            data-testid="common_register__input-email"
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
            data-testid="common_register__input-password"
            type="password"
            id="user-password"
            onChange={ ({ target }) => {
              setUserInfo({ ...userInfo, password: target.value });
            } }
          />
        </label>
        <button
          data-testid="common_register__button-register"
          type="button"
          disabled={
            !checkUserInfo(userInfo)
            || !(userInfo.name && userInfo.name.length >= TWELVE)
          }
          onClick={ register }
        >
          Registrar
        </button>
        { message
          ? showMessage(message, 'common_register__element-invalid_register')
          : null }
      </form>
    </div>
  );
}

RegisterPage.propTypes = {
  history: PropTypes.objectOf().isRequired,
};

export default RegisterPage;
