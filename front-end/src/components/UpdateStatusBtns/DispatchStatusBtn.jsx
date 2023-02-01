import PropTypes from 'prop-types';
import { updateSale } from '../../API/requests';

function DispatchStatusBtn({ id, status, setOrder }) {
  return (
    <button
      disabled={ status !== 'Preparando' }
      type="button"
      data-testid="seller_order_details__button-dispatch-check"
      onClick={ async () => {
        await updateSale(id, 'Em Trânsito');
        setOrder((prev) => ({ ...prev, status: 'Em Trânsito' }));
      } }
    >
      Saiu para à entrega
    </button>
  );
}

DispatchStatusBtn.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  setOrder: PropTypes.func.isRequired,
};

export default DispatchStatusBtn;
