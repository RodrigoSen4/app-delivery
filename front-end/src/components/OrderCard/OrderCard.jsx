import PropTypes from 'prop-types';
import { useContext } from 'react';
import ShopContext from '../../context/ShopContext';

function OrderCard({ props }) {
  const { index, name, quantity, price } = props;
  const { products, setProducts } = useContext(ShopContext);

  return (
    <div style={ { display: 'flex', gap: '16px', padding: '8px', fontSize: '20px' } }>
      <p
        data-testid={ `customer_checkout__element-order-table-item-number-${index}` }
      >
        { index + 1 }
      </p>
      <p
        data-testid={ `customer_checkout__element-order-table-name-${index}` }
      >
        { name }
      </p>
      <p
        data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
      >
        { quantity }
      </p>
      <p
        data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
      >
        { price.toString().replace('.', ',') }
      </p>
      <p
        data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
      >
        { (price * quantity).toFixed(2).toString().replace('.', ',') }
      </p>
      <button
        data-testid={ `customer_checkout__element-order-table-remove-${index}` }
        type="button"
        onClick={ () => {
          const updatedProducts = products
            .filter((product) => product.name !== name);
          setProducts(updatedProducts);
        } }
      >
        Remover
      </button>
    </div>
  );
}

OrderCard.propTypes = {
  props: PropTypes.objectOf().isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
};

export default OrderCard;
