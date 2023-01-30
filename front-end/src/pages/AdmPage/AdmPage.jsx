import { useState } from 'react';
import { checkUserInfo, showMessage } from '../../helpers/helpers';
import { registerAdm } from '../../API/requests';

function AdmPage() {
  const [infos, setInfo] = useState({
    name: null,
    email: null,
    password: null,
    role: 'Default',
  });

  const [message, setMessage] = useState('');

  const handleChange = ({ target }) => {
    setInfo({ ...infos, role: target.value });
  };

  const TWELVE = 12;

  const register = async () => {
    const { erro, status } = await registerAdm(infos);
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
            data-testid="admin_manage_input-name"
            type="text"
            onChange={ ({ target }) => {
              setInfo({ ...infos, name: target.value });
            } }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            data-testid="admin_manage_input-email"
            type="email"
            onChange={ ({ target }) => {
              setInfo({ ...infos, email: target.value });
            } }
          />
        </label>
        <label htmlFor="Senha">
          Senha:
          <input
            data-testid="admin_manage_input-password"
            type="password"
            onChange={ ({ target }) => {
              setInfo({ ...infos, password: target.value });
            } }
          />
        </label>
        <label htmlFor="Tipo">
          Tipo:
          <select value={ infos.tipo } onChange={ handleChange }>
            <option value="Vendedor">Vendedor</option>
            <option value="Cliente">Cliente</option>
            <option value="Administrador">Administrador</option>
          </select>
        </label>
        <button
          disabled={ !checkUserInfo(infos)
            || !(infos.name && infos.name.length >= TWELVE) }
          data-testid="admin_manage_button-register"
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
