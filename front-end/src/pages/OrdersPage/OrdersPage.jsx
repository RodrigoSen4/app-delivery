import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { getSales } from '../../API/requests';
import OrderInfoCard from '../../components/OrderInfoCard';
import NavBar from '../../components/NavBar/NavBar';

function OrdersPage({ history }) {
  const [orders, setOrders] = useState([]);

  const getOrdersFromDB = async () => {
    const ordersFromDB = await getSales();
    console.log(ordersFromDB);
    setOrders(ordersFromDB.payload);
  };

  useEffect(() => { getOrdersFromDB(); }, []);

  return (
    <div>
      <NavBar />
      <div>
        {
          orders.map((order) => (
            <OrderInfoCard
              orderInfo={ order }
              history={ history }
              key={ order.id }
            />
          ))
        }
      </div>
    </div>
  );
}

OrdersPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default OrdersPage;
