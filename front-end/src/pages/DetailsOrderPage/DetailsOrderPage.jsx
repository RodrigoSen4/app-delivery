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
      <div className="container-button-status">
        <DeliveredStatusBtn
          id={ id }
          status={ order.status || '' }
          setOrder={ setOrder }
        />
      </div>
    )
    : (
      <div className="container-button-status">
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
      </div>
    );

  const status = `${user}_order_details__element-order-details-label-delivery-status`;
  const orderDate = order.saleDate && order.saleDate.slice(0, TEN).split('-');

  const getOrderFromDB = async () => {
    const orderFromDB = await getSalesById(Number(id));
    setOrder(orderFromDB);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getOrderFromDB(), [order]);

  return (
    <div>
      <NavBar location={ path } />
      <header>
        <p
          data-testid={ `${user}_order_details__element-order-details-label-order-id` }
        >
          <span>Pedido:</span>
          <hr />
          <span>{ order.id }</span>
        </p>
        <p
          data-testid={ `${user}_order_details__element-order-details-label-seller-name` }
        >
          <span>Nome do Vendedor:</span>
          <hr />
          <span>{ order.seller ? order.seller.name : 'Sem nome' }</span>
        </p>
        <p
          data-testid={ `${user}_order_details__element-order-details-label-order-date` }
        >
          <span>Data do pedido:</span>
          <hr />
          <span>{ orderDate && `${orderDate[2]}/${orderDate[1]}/${orderDate[0]}` }</span>
        </p>
        <p
          data-testid={ status }
        >
          <span>Status</span>
          <hr />
          <span>{ order.status }</span>
        </p>
        <h3 data-testid={ `${user}_order_details__element-order-total-price` }>
          { order.totalPrice && order.totalPrice.toString().replace('.', ',')}
        </h3>
        { updateBtn }
      </header>
      <div className="container-details-orders">
        {
          order.products && order.products
            .map(({ name, price, SaleProduct, urlImage }, index) => (
              <OrderCard
                key={ `${SaleProduct.saleId}-${name}` }
                orderInfo={ {
                  index,
                  name,
                  price,
                  quantity: SaleProduct.quantity,
                  urlImage,
                } }
                userRole={ user }
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
    path: propTypes.string.isRequired,
  }).isRequired,
  userRole: propTypes.string.isRequired,
};

export default DetailsOrderPage;
