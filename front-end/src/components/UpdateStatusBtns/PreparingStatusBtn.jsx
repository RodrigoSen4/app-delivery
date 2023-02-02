import PropTypes from 'prop-types';
import { updateSale } from '../../API/requests';

function PreparingStatusBtn({ id, status, setOrder }) {
  return (
    <button
      className="button-status"
      disabled={ status !== 'Pendente' }
      type="button"
      data-testid="seller_order_details__button-preparing-check"
      onClick={ async () => {
        await updateSale(id, 'Preparando');
        setOrder((prev) => ({ ...prev, status: 'Preparando' }));
      } }
    >
      Preparando
    </button>
  );
}

PreparingStatusBtn.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  setOrder: PropTypes.func.isRequired,
};

export default PreparingStatusBtn;
