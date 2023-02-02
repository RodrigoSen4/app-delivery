import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { getSales } from '../../API/requests';
import OrderInfoCard from '../../components/OrderInfoCard/OrderInfoCard';
import NavBar from '../../components/NavBar/NavBar';
import '../../styles/Orders.css';

function OrdersPage({ history, userRole }) {
  const [orders, setOrders] = useState([]);

  const getOrdersFromDB = async () => {
    const ordersFromDB = await getSales();
    setOrders(ordersFromDB.payload);
  };

  useEffect(() => {
    const userInfo = localStorage.getItem('user');

    if (!userInfo || !JSON.parse(userInfo).token) return history.push('/login');
    getOrdersFromDB();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavBar location={ history.location.pathname } />
      <div className="container-orders-items">
        {
          orders.map((order) => (
            <OrderInfoCard
              orderInfo={ order }
              history={ history }
              userRole={ userRole }
              key={ order.id }
            />
          ))
        }
      </div>
    </>
  );
}

OrdersPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
  userRole: PropTypes.string.isRequired,
};

export default OrdersPage;
