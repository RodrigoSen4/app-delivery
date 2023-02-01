import PropTypes from 'prop-types';
import { useState } from 'react';
import trash from '../../images/trash.png';
import opentrash from '../../images/opentrash.png';

function UserCard({ usersData, deleteUser }) {
  const [trashButton, setTrashButton] = useState(trash);

  return (
    <tr>
      <td
        data-testid={
          `admin_manage__element-user-table-item-number-${usersData.id}`
        }
      >
        {usersData.id}

      </td>
      <td
        data-testid="admin_manage__element-user-table-name-"
      >
        {usersData.name}

      </td>
      <td
        data-testid={ `admin_manage__element-user-table-email-${usersData.id}` }
      >
        {usersData.email}

      </td>
      <td
        data-testid={ `admin_manage__element-user-table-role-${usersData.id}` }
      >
        {usersData.role}

      </td>
      <td>
        <button
          onMouseMove={ () => setTrashButton(opentrash) }
          onMouseLeave={ () => setTrashButton(trash) }
          className="button-remove-user"
          type="button"
          data-testid={ `admin_manage__element-user-table-remove-${usersData.id}` }
          onClick={ () => deleteUser(usersData.id) }
        >
          <img width="25" src={ trashButton } alt="" />
        </button>
      </td>
    </tr>
  );
}

UserCard.propTypes = {
  usersData: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    delUser: PropTypes.func,
  }).isRequired,
  deleteUser: PropTypes.func.isRequired,
};

export default UserCard;
