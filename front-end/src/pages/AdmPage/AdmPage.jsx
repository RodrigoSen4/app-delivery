import { useState, useEffect } from 'react';
import { checkUserInfo, showMessage } from '../../helpers/helpers';
import { registerAdm, getUsers } from '../../API/requests';
import UserCard from '../../components/UserCard/UserCard';

function AdmPage() {
  const [infos, setInfo] = useState({
    name: null,
    email: null,
    password: null,
    role: 'customer',
  });
  const [usersData, setUsers] = useState([]);

  const [message, setMessage] = useState('');

  const handleChange = ({ target }) => {
    setInfo({ ...infos, role: target.value });
  };

  const getUsersData = async () => {
    const users = await getUsers();
    setUsers(users);
  };

  useEffect(() => {
    getUsersData();
  }, [usersData]);

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
      <h2>Lista de usuários</h2>
      <thead />
      <tr>
        <th>Item</th>
        <th>E-mail</th>
        <th>Tipo</th>
        <th>Excluir</th>
      </tr>
      <div>
        {
          usersData.map((user) => (
            <UserCard
              key={ `${user.name}-${user.id}` }
              usersData={ user }
            />
          ))
        }
      </div>
    </div>
  );
}

export default AdmPage;
