import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { getSales } from '../../API/requests';
import OrderInfoCard from '../../components/OrderInfoCard/OrderInfoCard';
import NavBar from '../../components/NavBar/NavBar';

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
  }, []);

  return (
    <>
      <NavBar location={ history.location.pathname } />
      <div>
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
