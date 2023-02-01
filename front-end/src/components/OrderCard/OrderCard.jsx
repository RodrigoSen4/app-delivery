import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import ShopContext from '../../context/ShopContext';
import trash from '../../images/trash.png';
import opentrash from '../../images/opentrash.png';

function OrderCard({ orderInfo, page, location }) {
  const { products, setProducts } = useContext(ShopContext);
  const [trashButton, setTrashButton] = useState(trash);

  console.log(location);

  return (
    <div className="order-card">
      <img
        className={ `product-img ${orderInfo.name === 'Skol Lata 250ml'
          ? 'skol'
          : ''
        }` }
        src={ orderInfo.urlImage }
        alt=""
      />
      <p
        data-testid={
          `customer_${page}__element-order-table-item-number-${orderInfo.index}`
        }
      >
        { orderInfo.index + 1 }
      </p>
      <p
        data-testid={ `customer_${page}__element-order-table-name-${orderInfo.index}` }
      >
        { orderInfo.name }
      </p>
      <p
        data-testid={
          `customer_${page}__element-order-table-quantity-${orderInfo.index}`
        }
      >
        { orderInfo.quantity }
      </p>
      <p
        data-testid={
          `customer_${page}__element-order-table-unit-price-${orderInfo.index}`
        }
      >
        { orderInfo.price.toString().replace('.', ',') }
      </p>
      <p
        data-testid={
          `customer_${page}__element-order-table-sub-total-${orderInfo.index}`
        }
      >
        { (orderInfo.price * orderInfo.quantity).toFixed(2).toString().replace('.', ',') }
      </p>
      <button
        hidden={ location.includes('/customer/orders') }
        data-testid={ `customer_${page}__element-order-table-remove-${orderInfo.index}` }
        onMouseMove={ () => setTrashButton(opentrash) }
        onMouseLeave={ () => setTrashButton(trash) }
        type="button"
        onClick={ () => {
          const updatedProducts = products
            .filter((product) => product.name !== orderInfo.name);
          setProducts(updatedProducts);
        } }
      >
        <img width="47" src={ trashButton } alt="" />
      </button>
    </div>
  );
}

OrderCard.propTypes = {
  orderInfo: PropTypes.shape({
    index: PropTypes.number,
    name: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.string,
    urlImage: PropTypes.string,
  }).isRequired,
  page: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

export default OrderCard;
