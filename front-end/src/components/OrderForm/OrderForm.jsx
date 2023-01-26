/* import { useState } from 'react'; */
import PropTypes from 'prop-types';

import SelectSeller from './SelectSeller';

function OrderForm({ props }) {
  const { sellers } = props;

  return (
    <div>
      Detalhes e Endereço para Entrega
      <div>
        <form>
          <SelectSeller sellers={ sellers } />
          <label htmlFor="address-input">
            Endereço:
            <input
              data-testid="customer_checkout__input-address"
              type="text"
              id="address-input"
            />
          </label>
          <label htmlFor="address-input">
            Número:
            <input
              data-testid="customer_checkout__input-address-number"
              type="text"
              id="address-input"
            />
          </label>
        </form>
      </div>
      <button
        data-testid="customer_checkout__button-submit-order"
        type="button"
      >
        Finalizar Pedido
      </button>
    </div>
  );
}

OrderForm.propTypes = {
  props: PropTypes.objectOf().isRequired,
  sellers: PropTypes.arrayOf().isRequired,
};

export default OrderForm;
