import PropTypes from 'prop-types';
import RemoveOrderButton from './RemoveOrderButton';

function OrderCard({ orderInfo, page, userRole }) {
  const { price, quantity, index, name, urlImage } = orderInfo;

  return (
    <div className="order-card">
      <img
        className={ `product-img ${name === 'Skol Lata 250ml' && 'skol'}` }
        src={ urlImage }
        alt=""
      />
      <p
        data-testid={ `${userRole}_${page}__element-order-table-item-number-${index}` }
      >
        { index + 1 }
      </p>
      <p
        data-testid={ `${userRole}_${page}__element-order-table-name-${index}` }
      >
        { name }
      </p>
      <p
        data-testid={ `${userRole}_${page}__element-order-table-quantity-${index}` }
      >
        { quantity }
      </p>
      <p
        data-testid={ `${userRole}_${page}__element-order-table-unit-price-${index}` }
      >
        { price.toString().replace('.', ',') }
      </p>
      <p
        data-testid={ `${userRole}_${page}__element-order-table-sub-total-${index}` }
      >
        { (price * quantity).toFixed(2).toString().replace('.', ',') }
      </p>
      { page === 'checkout' && <RemoveOrderButton orderInfo={ orderInfo } /> }
    </div>
  );
}

OrderCard.propTypes = {
  orderInfo: PropTypes.shape({
    index: PropTypes.number,
    name: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.string,
    urlImage: PropTypes.string,
  }).isRequired,
  page: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired,
};

export default OrderCard;
