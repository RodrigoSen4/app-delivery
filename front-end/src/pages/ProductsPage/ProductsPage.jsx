import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../components/NavBar/NavBar';
import { getAllProducts } from '../../API/requests';
import ProductCard from '../../components/ProductCard/ProductCard';
import ShopContext from '../../context/ShopContext';
import '../../styles/ProductsPage.css';
import cart from '../../images/cart.png';

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
      <NavBar location={ history.location.pathname } />
      <div className="container-button">
        <button
          className="button-cart"
          type="button"
          data-testid="customer_products__button-cart"
          onClick={ () => history.push('/customer/checkout') }
          disabled={ totalPrice === 0 }
        >
          <img width="30" src={ cart } alt="" />
          {' '}
          <span
            data-testid="customer_products__checkout-bottom-value"
          >
            { totalPrice.toFixed(2).toString().replace('.', ',') }
          </span>
        </button>
      </div>
      <section className="container-cards">
        {
          products.map((product) => (
            <ProductCard
              key={ `${product.name}-${product.id}` }
              productInfo={ product }
            />
          ))
        }
      </section>
    </>
  );
}

ProductsPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default ProductsPage;
