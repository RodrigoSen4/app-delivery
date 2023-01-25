import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../components/NavBar/NavBar';
import { getAllProducts } from '../../API/requests';
import ProductCard from '../../components/ProductCard/ProductCard';
import ShopContext from '../../context/ShopContext';

function ProductsPage({ history }) {
  const [products, setProducts] = useState([]);
  const { products: orderedProducts } = useContext(ShopContext);
  let totalPrice = 0;
  orderedProducts.forEach((product) => {
    const price = product.price * product.quantity;
    totalPrice += price;
  });

  const renderAllProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  useState(() => {
    const userInfo = localStorage.getItem('user');

    if (!userInfo || !JSON.parse(userInfo).token) return history.push('/login');

    renderAllProducts();
  }, []);

  return (
    <>
      <NavBar />
      <section>
        {
          products.map((product) => (
            <ProductCard key={ `${product.name}-${product.id}` } props={ product } />
          ))
        }
      </section>
      <button type="button" data-testid="customer_products__button-cart">
        Ver Carrinho:
        {' '}
        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          { totalPrice.toFixed(2).toString().replace('.', ',') }
        </span>
      </button>
    </>
  );
}

ProductsPage.propTypes = {
  history: PropTypes.objectOf().isRequired,
};

export default ProductsPage;
