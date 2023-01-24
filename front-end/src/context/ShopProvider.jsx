import PropTypes from 'prop-types';
import { useState } from 'react';
import ShopContext from './ShopContext';

function ShopProvider({ children }) {
  const [products, setProducts] = useState([]);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const valueProvider = {
    products,
    setProducts,
  };

  return (
    <ShopContext.Provider value={ valueProvider }>
      { children }
    </ShopContext.Provider>
  );
}

ShopProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default ShopProvider;
