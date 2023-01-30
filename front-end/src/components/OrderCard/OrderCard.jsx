import PropTypes from 'prop-types';
import { useContext } from 'react';
import ShopContext from '../../context/ShopContext';

function OrderCard({ orderInfo }) {
  const { products, setProducts } = useContext(ShopContext);

  return (
    <div style={ { display: 'flex', gap: '16px', padding: '8px', fontSize: '20px' } }>
      <p
        data-testid={
          `customer_checkout__element-order-table-item-number-${orderInfo.index}`
        }
      >
        { orderInfo.index + 1 }
      </p>
      <p
        data-testid={ `customer_checkout__element-order-table-name-${orderInfo.index}` }
      >
        { orderInfo.name }
      </p>
      <p
        data-testid={
          `customer_checkout__element-order-table-quantity-${orderInfo.index}`
        }
      >
        { orderInfo.quantity }
      </p>
      <p
        data-testid={
          `customer_checkout__element-order-table-unit-price-${orderInfo.index}`
        }
      >
        { orderInfo.price.toString().replace('.', ',') }
      </p>
      <p
        data-testid={
          `customer_checkout__element-order-table-sub-total-${orderInfo.index}`
        }
      >
        { (orderInfo.price * orderInfo.quantity).toFixed(2).toString().replace('.', ',') }
      </p>
      <button
        data-testid={ `customer_checkout__element-order-table-remove-${orderInfo.index}` }
        type="button"
        onClick={ () => {
          const updatedProducts = products
            .filter((product) => product.name !== orderInfo.name);
          setProducts(updatedProducts);
        } }
      >
        Remover
      </button>
    </div>
  );
}

OrderCard.propTypes = {
  orderInfo: PropTypes.shape({
    index: PropTypes.number,
    name: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.string,
  }).isRequired,
};

export default OrderCard;
