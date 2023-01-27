import PropTypes from 'prop-types';

const TEN = 10;

function OrderInfoCard({ orderInfo, history }) {
  const date = orderInfo.saleDate.slice(0, TEN).split('-');
  const formatedDate = `${date[2]}/${date[1]}/${date[0]}`;

  return (
    <button
      type="button"
      onClick={ () => { history.push(`/customer/orders/${orderInfo.id}`); } }
    >
      <div style={ { display: 'flex', gap: '16px', padding: '8px', fontSize: '20px' } }>
        <p
          data-testid={ `customer_orders__element-order-id-${orderInfo.id}` }
        >
          PEDIDO:
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
          { formatedDate }
        </p>
        <p
          data-testid={ `customer_orders__element-card-price-${orderInfo.id}` }
        >
          { orderInfo.totalPrice.replace('.', ',') }
        </p>
      </div>
    </button>
  );
}

OrderInfoCard.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  orderInfo: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    saleDate: PropTypes.string,
    totalPrice: PropTypes.string,
  }).isRequired,
};

export default OrderInfoCard;
