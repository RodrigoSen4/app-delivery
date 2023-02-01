import PropTypes from 'prop-types';
import { updateSale } from '../../API/requests';

function DeliveredStatusBtn({ id, status, setOrder }) {
  return (
    <button
      disabled={ status !== 'Em Trânsito' }
      type="button"
      data-testid="customer_order_details__button-delivery-check"
      onClick={ async () => {
        await updateSale(id, 'Entregue');
        setOrder((prev) => ({ ...prev, status: 'Entregue' }));
      } }
    >
      Entregue
    </button>
  );
}

DeliveredStatusBtn.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  setOrder: PropTypes.func.isRequired,
};

export default DeliveredStatusBtn;
