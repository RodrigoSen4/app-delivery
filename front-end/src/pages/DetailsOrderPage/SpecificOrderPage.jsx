import { useState, useEffect } from 'react';
import { getSales } from '../../API/requests';

function DetailsOrderPage({ match: { params: { id } } }) {
  const [order, setOrder] = useState({});

  const getOrderFromDB = async () => {
    const orderFromDB = await getSales(id);
    setOrder(orderFromDB);
  };

  useEffect(() => { getOrderFromDB(); }, []);

  return (
    <div>
      <header>
        <p data-testid='customer_order_details__element-order-details-label-order-id'>
          Pedido:
        </p>
        <p data-testid='customer_order_details__element-order-details-label-seller-name'>

        </p>
        <p data-testid='customer_order_details__element-order-details-label-order-date'>

        </p>
        <p data-testid='customer_order_details__element-order-details-label-delivery-status<index>'>

        </p>
        <p data-testid='customer_order_details__button-delivery-check'>

        </p>
      </header>
      <h3 data-testid="customer_order_details__element-order-total-price">
        Total:
      </h3>
    </div>
  );
}

export default DetailsOrderPage;
