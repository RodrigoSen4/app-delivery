import propTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { getSalesById } from '../../API/requests';
import NavBar from '../../components/NavBar/NavBar';
import OrderCard from '../../components/OrderCard/OrderCard';

const statusTest = 'customer_order_details__element-order-details-label-delivery-status';
const TEN = 10;

function DetailsOrderPage({ match: { params: { id } } }) {
  const [order, setOrder] = useState({});

  const orderDate = order.saleDate && order.saleDate.slice(0, TEN).split('-');

  const getOrderFromDB = async () => {
    const orderFromDB = await getSalesById(Number(id));
    setOrder(orderFromDB);
  };

  useEffect(() => {
    getOrderFromDB();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <NavBar />
      <header>
        <p data-testid="customer_order_details__element-order-details-label-order-id">
          {`Pedido: ${order.id}`}
        </p>
        <p data-testid="customer_order_details__element-order-details-label-seller-name">
          {`Nome do Vendedor: ${order.seller ? order.seller.name : 'Sem nome'}`}
        </p>
        <p data-testid="customer_order_details__element-order-details-label-order-date">
          Data do pedido:
          {' '}
          {orderDate && `${orderDate[2]}/${orderDate[1]}/${orderDate[0]}`}
        </p>
        <p
          data-testid={ statusTest }
        >
          STATUS:
          {' '}
          { order.status }
        </p>
        <button
          disabled={ order.status !== 'Preparando' }
          type="button"
          data-testid="customer_order_details__button-delivery-check"
        >
          MARCAR COMO ENTREGUE
        </button>
      </header>
      {
        order.products && order.products.map(({ name, price, SaleProduct }, index) => (
          <OrderCard
            key={ `${SaleProduct.saleId}-${name}` }
            orderInfo={ {
              index,
              name,
              price,
              quantity: SaleProduct.quantity,
            } }
            page="order_details"
          />
        ))
      }
      <h3 data-testid="customer_order_details__element-order-total-price">
        { order.totalPrice && order.totalPrice.toString().replace('.', ',')}
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
