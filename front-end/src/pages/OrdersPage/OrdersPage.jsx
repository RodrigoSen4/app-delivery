import { useState, useEffect } from 'react';
import { getSales } from '../../API/requests';
import OrderInfoCard from '../../components/OrderInfoCard';
import NavBar from '../../components/NavBar/NavBar';

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const getOrdersFromDB = async () => {
    const ordersFromDB = await getSales();
    setOrders(ordersFromDB);
  };

  useEffect(() => { getOrdersFromDB(); }, []);

  return (
    <div>
      <NavBar />
      <div>
        {
          orders.map((order) => (
            <OrderInfoCard orderInfo={ order } key={ order.id } />
          ))
        }
      </div>
    </div>
  );
}

export default OrdersPage;
