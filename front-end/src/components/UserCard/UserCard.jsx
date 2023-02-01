import PropTypes from 'prop-types';

function UserCard({ usersData, deleteUser }) {
  return (
    <div>
      <table>
        <tbody>
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
            <button
              type="button"
              data-testid={ `admin_manage__element-user-table-remove-${usersData.id}` }
              onClick={ () => deleteUser(usersData.id) }
            >
              Excluir
            </button>
          </tr>

        </tbody>
      </table>
    </div>
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
