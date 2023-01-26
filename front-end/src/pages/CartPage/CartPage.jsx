import { useContext } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import ShopContext from '../../context/ShopContext';
import OrderCard from '../../components/OrderCard/OrderCard';
import OrderForm from '../../components/OrderForm/OrderForm';

function CartPage() {
  const { products } = useContext(ShopContext);

  return (
    <section>
      <NavBar />
      <div>
        {
          products.map((product, index) => (
            <OrderCard props={ { ...product, index } } key={ product.name } />
          ))
        }
      </div>
      <OrderForm />
    </section>
  );
}

export default CartPage;
