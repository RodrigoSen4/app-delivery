import PropTypes from 'prop-types';

function AddressComponent({ address }) {
  const { id, deliveryAddress, deliveryNumber } = address;
  return (
    <p data-testid={ `seller_orders__element-card-address-${id}` }>
      { `${deliveryAddress}, ${deliveryNumber}` }
    </p>
  );
}

AddressComponent.propTypes = {
  address: PropTypes.shape({
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default AddressComponent;
