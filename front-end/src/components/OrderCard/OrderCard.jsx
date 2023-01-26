import PropTypes from 'prop-types';

function OrderCard({ props }) {
  const { index, name, quantity, price } = props;

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
        { price }
      </p>
      <p
        data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
      >
        { (price * quantity).toFixed(2) }
      </p>
      <button
        data-testid={ `customer_checkout__element-order-table-remove-${index}` }
        type="button"
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
