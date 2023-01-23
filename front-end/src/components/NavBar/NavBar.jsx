function NavBar() {
  return (
    <nav style={ { display: 'flex', justifyContent: 'space-between' } }>
      <a
        href="/produtos"
        data-testid="customer_products__element-navbar-link-products"
      >
        Produtos
      </a>
      <a
        href="/meus_pedidos"
        data-testid="customer_products__element-navbar-link-orders"
      >
        Meus Pedidos
      </a>
      <p
        data-testid="customer_products__element-navbar-user-full-name"
      >
        { localStorage.name || 'Zé' }
      </p>
      <a
        href="/sair"
        data-testid="customer_products__element-navbar-link-logout"
      >
        Sair
      </a>
    </nav>
  );
}

export default NavBar;
