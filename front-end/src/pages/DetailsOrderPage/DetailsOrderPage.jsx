import propTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { getSalesById } from '../../API/requests';
import NavBar from '../../components/NavBar/NavBar';
import OrderCard from '../../components/OrderCard/OrderCard';
import '../../styles/DetailsOrder.css';

const statusTest = 'customer_order_details__element-order-details-label-delivery-status';
const TEN = 10;

function DetailsOrderPage({ history, match: { params: { id } } }) {
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
          <span>Pedido:</span>
          <hr />
          <span>{ order.id }</span>
        </p>
        <p data-testid="customer_order_details__element-order-details-label-seller-name">
          <span>Nome do Vendedor:</span>
          <hr />
          <span>{ order.seller ? order.seller.name : 'Sem nome' }</span>
        </p>
        <p data-testid="customer_order_details__element-order-details-label-order-date">
          <span>Data do pedido:</span>
          <hr />
          <span>{orderDate && `${orderDate[2]}/${orderDate[1]}/${orderDate[0]}`}</span>
        </p>
        <p
          data-testid={ statusTest }
        >
          <span>STATUS:</span>
          <hr />
          <span className={ order.status }>{ order.status }</span>
        </p>
        <h3 data-testid="customer_order_details__element-order-total-price">
          { order.totalPrice && order.totalPrice.toString().replace('.', ',')}
        </h3>
        <button
          disabled={ order.status !== 'Preparando' }
          type="button"
          data-testid="customer_order_details__button-delivery-check"
        >
          MARCAR COMO ENTREGUE
        </button>
      </header>
      <div className="container-details-orders">
        {
          order.products && order.products
            .map(({ name, price, SaleProduct, urlImage }, index) => (
              <OrderCard
                location={ history.location.pathname }
                key={ `${SaleProduct.saleId}-${name}` }
                orderInfo={ {
                  index,
                  name,
                  price,
                  quantity: SaleProduct.quantity,
                  urlImage,
                } }
                page="order_details"
              />
            ))
        }
      </div>
    </div>
  );
}

DetailsOrderPage.propTypes = {
  history: propTypes.shape({
    location: propTypes.shape({
      pathname: propTypes.string,
    }),
  }).isRequired,
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }).isRequired,
};

export default DetailsOrderPage;
