import { useContext } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../components/NavBar/NavBar';
import ShopContext from '../../context/ShopContext';
import OrderCard from '../../components/OrderCard/OrderCard';
import OrderForm from '../../components/OrderForm/OrderForm';

function CartPage({ history }) {
  const { products } = useContext(ShopContext);

  const totalPrice = products
    .reduce((pre, acc) => (acc.quantity * Number(acc.price)) + pre, 0)
    .toFixed(2).replace('.', ',');

  return (
    <section>
      <NavBar />
      <div>
        {
          products.map((product, index) => (
            <OrderCard orderInfo={ { ...product, index } } key={ product.name } />
          ))
        }
      </div>
      <p
        style={ { fontSize: '20px' } }
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
