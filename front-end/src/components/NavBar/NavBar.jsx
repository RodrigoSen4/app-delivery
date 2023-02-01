import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logout from '../../images/logout.png';
import '../../styles/NavBar.css';

function NavBar({ location }) {
  const user = localStorage.getItem('user');
  const name = user ? JSON.parse(user).name : 'Zé';

  const customerProducts = '/customer';

  return (
    <nav>
      {
        location.includes('/seller/orders')
        || (
          <Link
            className={ location === customerProducts ? 'selected' : null }
            to="/customer/products"
            data-testid="customer_products__element-navbar-link-products"
          >
            Produtos
          </Link>
        )
      }
      <Link
        className={ location === '/customer/orders' ? 'selected' : null }
        to={ location.includes(customerProducts) ? '/customer/orders' : '/seller/orders' }
        data-testid="customer_products__element-navbar-link-orders"
      >
        Meus Pedidos
      </Link>
      <p
        data-testid="customer_products__element-navbar-user-full-name"
      >
        { name }
      </p>
      <Link
        to="/login"
        onClick={ () => localStorage.removeItem('user') }
        data-testid="customer_products__element-navbar-link-logout"
      >
        Sair
        <img width="20" src={ logout } alt="" />
      </Link>
    </nav>
  );
}

NavBar.defaultProps = {
  location: '',
};

NavBar.propTypes = {
  location: PropTypes.string,
};

export default NavBar;
