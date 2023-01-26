/* import { useState } from 'react'; */
import SelectSeller from './SelectSeller';

function OrderForm() {
  return (
    <div>
      Detalhes e Endereço para Entrega
      <div>
        <form>
          <SelectSeller />
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

export default OrderForm;
