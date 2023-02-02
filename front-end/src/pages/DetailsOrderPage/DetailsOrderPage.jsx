import propTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { getSalesById } from '../../API/requests';
import NavBar from '../../components/NavBar/NavBar';
import OrderCard from '../../components/OrderCard/OrderCard';
import DeliveredStatusBtn from '../../components/UpdateStatusBtns/DeliveredStatusBtn';
import PreparingStatusBtn from '../../components/UpdateStatusBtns/PreparingStatusBtn';
import DispatchStatusBtn from '../../components/UpdateStatusBtns/DispatchStatusBtn';
import '../../styles/DetailsOrder.css';

const TEN = 10;

function DetailsOrderPage({ match: { params: { id }, path }, userRole: user }) {
  const [order, setOrder] = useState({});

  const updateBtn = user === 'customer'
    ? (
      <DeliveredStatusBtn
        id={ id }
        status={ order.status || '' }
        setOrder={ setOrder }
      />
    )
    : (
      <>
        <PreparingStatusBtn
          id={ id }
          status={ order.status || '' }
          setOrder={ setOrder }
        />
        <DispatchStatusBtn
          id={ id }
          status={ order.status || '' }
          setOrder={ setOrder }
        />
      </>
    );

  const status = `${user}_order_details__element-order-details-label-delivery-status`;
  const orderDate = order.saleDate && order.saleDate.slice(0, TEN).split('-');

  const getOrderFromDB = async () => {
    const orderFromDB = await getSalesById(Number(id));
    setOrder(orderFromDB);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getOrderFromDB(), []);

  return (
    <div>
      <NavBar location={ path } />
      <header>
        <p
          data-testid={ `${user}_order_details__element-order-details-label-order-id` }
        >
          {`Pedido: ${order.id}`}
        </p>
        <p
          data-testid={ `${user}_order_details__element-order-details-label-seller-name` }
        >
          { `Nome do Vendedor: ${order.seller ? order.seller.name : 'Sem nome'}` }
        </p>
        <p
          data-testid={ `${user}_order_details__element-order-details-label-order-date` }
        >
          Data do pedido:
          {' '}
          {orderDate && `${orderDate[2]}/${orderDate[1]}/${orderDate[0]}`}
        </p>
        <p
          data-testid={ status }
        >
          { order.status }
        </p>
        { updateBtn }
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
            userRole={ user }
            page="order_details"
          />
        ))
      }
      <h3 data-testid={ `${user}_order_details__element-order-total-price` }>
        { order.totalPrice && order.totalPrice.toString().replace('.', ',')}
      </h3>
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
    path: propTypes.string.isRequired,
  }).isRequired,
  userRole: propTypes.string.isRequired,
};

export default DetailsOrderPage;
