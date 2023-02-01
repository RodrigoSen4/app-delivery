import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import ShopContext from '../../context/ShopContext';
import opentrash from '../../images/opentrash.png';
import trash from '../../images/trash.png';

function RemoveOrderButton({ orderInfo }) {
  const { products, setProducts } = useContext(ShopContext);
  const [trashButton, setTrashButton] = useState(trash);

  return (
    <button
      data-testid={ `customer_checkout__element-order-table-remove-${orderInfo.index}` }
      onMouseMove={ () => setTrashButton(opentrash) }
      onMouseLeave={ () => setTrashButton(trash) }
      type="button"
      onClick={ () => {
        const updatedProducts = products
          .filter((product) => product.name !== orderInfo.name);
        setProducts(updatedProducts);
      } }
    >
      <img width="47" src={ trashButton } alt="trash-icon" />
    </button>
  );
}

RemoveOrderButton.propTypes = {
  orderInfo: PropTypes.shape({
    index: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
};

export default RemoveOrderButton;
