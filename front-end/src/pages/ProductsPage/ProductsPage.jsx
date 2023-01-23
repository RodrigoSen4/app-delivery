import { useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { getAllProducts } from '../../API/requests';
import ProductCard from '../../components/ProductCard/ProductCard';

function ProductsPage() {
  const [products, setProducts] = useState([]);

  const renderAllProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  useState(() => renderAllProducts(), []);

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

export default ProductsPage;
