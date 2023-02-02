import { useState, useEffect } from 'react';
import { checkUserInfo, showMessage } from '../../helpers/helpers';
import { registerAdm, getUsers, delUser } from '../../API/requests';
import UserCard from '../../components/UserCard/UserCard';
import '../../styles/AdmPage.css';

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

  const deleteUser = async (id) => {
    await delUser(id);
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
    <div className="container-form-list">
      <h1>Cadastrar usuários</h1>
      <form>
        <div className="container-name-email">
          <label htmlFor="Nome">
            <input
              placeholder="Nome (mínimo 12 caractéres)"
              data-testid="admin_manage__input-name"
              type="text"
              onChange={ ({ target }) => {
                setInfo({ ...infos, name: target.value });
              } }
            />
          </label>
          <label htmlFor="email">
            <input
              placeholder="E-mail"
              data-testid="admin_manage__input-email"
              type="email"
              onChange={ ({ target }) => {
                setInfo({ ...infos, email: target.value });
              } }
            />
          </label>
        </div>
        <div className="container-pass-select">
          <label htmlFor="Senha">
            <input
              placeholder="Senha"
              data-testid="admin_manage__input-password"
              type="password"
              onChange={ ({ target }) => {
                setInfo({ ...infos, password: target.value });
              } }
            />
          </label>
          <select
            data-testid="admin_manage__select-role"
            value={ infos.tipo }
            onChange={ handleChange }
          >
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
            <option value="administrator">Administrador</option>
          </select>
        </div>
      </form>
      <button
        className="register-button"
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
      <h2>Lista de usuários</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Remover</th>
          </tr>
        </thead>
        <tbody>
          {
            usersData.map((user) => (
              <UserCard
                key={ `${user.name}-${user.id}` }
                usersData={ user }
                deleteUser={ deleteUser }
              />
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default AdmPage;
