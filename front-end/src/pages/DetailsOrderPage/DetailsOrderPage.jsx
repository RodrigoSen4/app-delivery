/* import PropTypes from 'prop-types'; */
/* import { useState, useEffect } from 'react';
import { getSales } from '../../API/requests'; */
import NavBar from '../../components/NavBar/NavBar';

function DetailsOrderPage(/* { match: { params: { id } } } */) {
  /* const [order, setOrder] = useState({});

  const getOrderFromDB = async () => {
    const orderFromDB = await getSales(id);
    setOrder(orderFromDB);
  };

  useEffect(() => { getOrderFromDB(); }, []); */

  return (
    <div>
      <NavBar />
      <header>
        <p data-testid="customer_order_details__element-order-details-label-order-id">
          Pedido:
        </p>
        <p data-testid="customer_order_details__element-order-details-label-seller-name">
          Nome do vendedor:
        </p>
        <p data-testid="customer_order_details__element-order-details-label-order-date">
          Data do pedido:
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

/* DetailsOrderPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.func,
    }),
  }).isRequired,
}; */

export default DetailsOrderPage;
