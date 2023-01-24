import { useState } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../components/NavBar/NavBar';
import { getAllProducts } from '../../API/requests';
import ProductCard from '../../components/ProductCard/ProductCard';

function ProductsPage({ history }) {
  const [products, setProducts] = useState([]);

  const renderAllProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  useState(() => {
    const { token } = JSON.parse(localStorage.getItem('userInfo'));

    if (!token) return history.push('/login');

    renderAllProducts();
  }, []);

  return (
    <>
      <NavBar />
      <section>
        {
          products.map((product) => (
            <ProductCard key={ `${product.name}-${product.id}` } props={ product } />
          ))
        }
      </section>
    </>
  );
}

ProductsPage.propTypes = {
  history: PropTypes.objectOf().isRequired,
};

export default ProductsPage;
