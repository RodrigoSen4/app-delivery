import { useContext } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../components/NavBar/NavBar';
import ShopContext from '../../context/ShopContext';
import OrderCard from '../../components/OrderCard/OrderCard';
import OrderForm from '../../components/OrderForm/OrderForm';
import '../../styles/Cart.css';

function CartPage({ history }) {
  const { products } = useContext(ShopContext);

  const totalPrice = products
    .reduce((pre, acc) => (acc.quantity * Number(acc.price)) + pre, 0)
    .toFixed(2).replace('.', ',');

  return (
    <section>
      <NavBar />
      <div className="container-orders">
        {
          products.map((product, index) => (
            <OrderCard
              orderInfo={ { ...product, index } }
              page="checkout"
              key={ product.name }
            />
          ))
        }
      </div>
      <p
        className="total-price"
        data-testid="customer_checkout__element-order-total-price"
      >
        {
          totalPrice || 0
        }
      </p>
      <OrderForm history={ history } />
    </section>
  );
}

CartPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default CartPage;
