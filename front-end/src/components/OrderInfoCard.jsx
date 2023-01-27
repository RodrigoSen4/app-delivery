import PropTypes from 'prop-types';

function OrderInfoCard({ orderInfo }) {
  return (
    <div style={ { display: 'flex', gap: '16px', padding: '8px', fontSize: '20px' } }>
      <p
        data-testid={ `customer_orders__element-order-${orderInfo.id}` }
      >
        PEDIDO:
        {' '}
        { orderInfo.id }
      </p>
      <p
        data-testid={ `customer_orders__element-delivery-status-${orderInfo.id}` }
      >
        { orderInfo.status }
      </p>
      <p
        data-testid={ `customer_orders__element-order-date-${orderInfo.id}` }
      >
        { orderInfo.date }
      </p>
      <p
        data-testid={ `customer_orders__element-card-price-${orderInfo.id}` }
      >
        { orderInfo.price.toString().replace('.', ',') }
      </p>
    </div>
  );
}

OrderInfoCard.propTypes = {
  orderInfo: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    date: PropTypes.string,
    price: PropTypes.string,
  }).isRequired,
};

export default OrderInfoCard;
