import PropTypes from 'prop-types';
import AddressComponent from './AddressComponent';

const TEN = 10;

function OrderInfoCard({ orderInfo, history, userRole }) {
  const date = orderInfo.saleDate.slice(0, TEN).split('-');
  const formatedDate = `${date[2]}/${date[1]}/${date[0]}`;

  console.log(orderInfo);

  return (
    <button
      type="button"
      onClick={ () => { history.push(`/${userRole}/orders/${orderInfo.id}`); } }
    >
      <div style={ { display: 'flex', gap: '16px', padding: '8px', fontSize: '20px' } }>
        <p
          data-testid={ `${userRole}_orders__element-order-id-${orderInfo.id}` }
        >
          PEDIDO:
          { orderInfo.id }
        </p>
        <p
          data-testid={ `${userRole}_orders__element-delivery-status-${orderInfo.id}` }
        >
          { orderInfo.status }
        </p>
        <p
          data-testid={ `${userRole}_orders__element-order-date-${orderInfo.id}` }
        >
          { formatedDate }
        </p>
        <p
          data-testid={ `${userRole}_orders__element-card-price-${orderInfo.id}` }
        >
          { orderInfo.totalPrice.replace('.', ',') }
        </p>
        { userRole === 'seller' ? <AddressComponent
          address={ {
            deliveryAddress: orderInfo.deliveryAddress,
            deliveryNumber: orderInfo.deliveryNumber,
            id: orderInfo.id,
          } }
        /> : null }
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
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.string,
  }).isRequired,
  userRole: PropTypes.string.isRequired,
};

export default OrderInfoCard;
