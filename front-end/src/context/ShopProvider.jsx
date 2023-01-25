import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';
import ShopContext from './ShopContext';

function ShopProvider({ children }) {
  const [products, setProducts] = useState([]);

  const valueProvider = useMemo(
    () => ({ products, setProducts }),
    [products, setProducts],
  );

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
