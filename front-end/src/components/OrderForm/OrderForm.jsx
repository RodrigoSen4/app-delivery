import { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import SelectSeller from './SelectSeller';
import ShopContext from '../../context/ShopContext';
import { postSale } from '../../API/requests';

function OrderForm({ history }) {
  const { products } = useContext(ShopContext);
  const [order, setOrder] = useState({ saleInfo: { sellerId: 2 } });

  const changeInput = ({ target: { value, name } }) => {
    setOrder({ ...order, saleInfo: { ...order.saleInfo, [name]: value } });
  };

  const updateProductsFromOrder = () => {
    const productsToOrder = products
      .map(({ id, quantity }) => ({ productId: id, quantity }));

    const totalPrice = Number(products
      .reduce((pre, acc) => (acc.quantity * Number(acc.price)) + pre, 0)
      .toFixed(2));

    setOrder({ products: productsToOrder, saleInfo: { ...order.saleInfo, totalPrice } });
  };

  const saveSale = async () => {
    const id = await postSale(order);
    history.push(`/customer/orders/${id}`);
  };

  useEffect(() => {
    updateProductsFromOrder();
  }, [products]);

  return (
    <div>
      Detalhes e Endereço para Entrega
      <div>
        <form>
          <SelectSeller orderInfo={ { setOrder, order } } />
          <label htmlFor="address-input">
            Endereço:
            <input
              data-testid="customer_checkout__input-address"
              type="text"
              id="address-input"
              name="deliveryAddress"
              onChange={ changeInput }
            />
          </label>
          <label htmlFor="address-input">
            Número:
            <input
              data-testid="customer_checkout__input-address-number"
              type="text"
              id="address-input"
              name="deliveryNumber"
              onChange={ changeInput }
            />
          </label>
        </form>
      </div>
      <button
        data-testid="customer_checkout__button-submit-order"
        type="button"
        onClick={ saveSale }
      >
        Finalizar Pedido
      </button>
    </div>
  );
}

OrderForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default OrderForm;
