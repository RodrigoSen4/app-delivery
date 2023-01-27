import { Link } from 'react-router-dom';

function NavBar() {
  const { name } = JSON.parse(localStorage.getItem('user'));

  return (
    <nav style={ { display: 'flex', justifyContent: 'space-between' } }>
      <Link
        to="/customer/products"
        data-testid="customer_products__element-navbar-link-products"
      >
        Produtos
      </Link>
      <Link
        to="/customer/orders"
        data-testid="customer_products__element-navbar-link-orders"
      >
        Meus Pedidos
      </Link>
      <p
        data-testid="customer_products__element-navbar-user-full-name"
      >
        { name || 'Zé' }
      </p>
      <Link
        to="/login"
        onClick={ () => localStorage.removeItem('user') }
        data-testid="customer_products__element-navbar-link-logout"
      >
        Sair
      </Link>
    </nav>
  );
}

export default NavBar;
