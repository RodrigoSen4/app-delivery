import { useState } from 'react';
import { checkUserInfo, showMessage } from '../../helpers/helpers';
import { registerAdm } from '../../API/requests';

function AdmPage() {
  const [infos, setInfo] = useState({
    name: null,
    email: null,
    password: null,
    role: 'customer',
  });

  const [message, setMessage] = useState('');

  const handleChange = ({ target }) => {
    setInfo({ ...infos, role: target.value });
  };

  const TWELVE = 12;

  const register = async () => {
    const admToken = JSON.parse(localStorage.getItem('user')).token;

    const { erro, status } = await registerAdm(infos, admToken);

    if (!status) {
      setMessage(erro);
    }
  };

  return (
    <div>
      <form>
        <label htmlFor="Nome">
          Nome e sobrenome:
          <input
            data-testid="admin_manage__input-name"
            type="text"
            onChange={ ({ target }) => {
              setInfo({ ...infos, name: target.value });
            } }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            data-testid="admin_manage__input-email"
            type="email"
            onChange={ ({ target }) => {
              setInfo({ ...infos, email: target.value });
            } }
          />
        </label>
        <label htmlFor="Senha">
          Senha:
          <input
            data-testid="admin_manage__input-password"
            type="password"
            onChange={ ({ target }) => {
              setInfo({ ...infos, password: target.value });
            } }
          />
        </label>
        <label htmlFor="Tipo">
          Tipo:
          <select
            data-testid="admin_manage__select-role"
            value={ infos.tipo }
            onChange={ handleChange }
          >
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
            <option value="administrator">Administrador</option>
          </select>
        </label>
        <button
          disabled={ !checkUserInfo(infos)
            || !(infos.name && infos.name.length >= TWELVE) }
          data-testid="admin_manage__button-register"
          type="button"
          onClick={ register }
        >
          Cadastrar
        </button>
        { message
          ? showMessage(message, 'admin_manage__element-invalid-register')
          : null }
      </form>
    </div>
  );
}

export default AdmPage;
