import propTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { getSalesById } from '../../API/requests';
import NavBar from '../../components/NavBar/NavBar';

function DetailsOrderPage({ match: { params: { id } } }) {
  const [order, setOrder] = useState();

  useEffect(() => {
    const getOrderFromDB = async () => {
      const orderFromDB = await getSalesById(id);
      setOrder(orderFromDB);
      console.log(orderFromDB);
    };
    getOrderFromDB();
  }, [id]);

  return (
    <div>
      <NavBar />
      <header>
        <p data-testid="customer_order_details__element-order-details-label-order-id">
          {`Pedido: ${order.id}`}
        </p>
        <p data-testid="customer_order_details__element-order-details-label-seller-name">
          {`Nome do Vendedor: ${order.seller.name}`}
        </p>
        <p data-testid="customer_order_details__element-order-details-label-order-date">
          {`Data do pedido: ${order.saleDate}`}
        </p>
        <p
          data-testid="customer_order_details__
          element-order-details-label-delivery-status<index>"
        >
          Status:
        </p>
        <button type="button" data-testid="customer_order_details__button-delivery-check">
          Entregue
        </button>
      </header>
      <h3 data-testid="customer_order_details__element-order-total-price">
        Total:
      </h3>
    </div>
  );
}

DetailsOrderPage.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }).isRequired,
};

export default DetailsOrderPage;
