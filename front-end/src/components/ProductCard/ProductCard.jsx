import PropTypes from 'prop-types';
import { useContext } from 'react';
import ShopContext from '../../context/ShopContext';
import '../../styles/ProductCard.css';

const MENOSUM = -1;

function ProductCard(props) {
  const { productInfo } = props;
  const { products, setProducts } = useContext(ShopContext);

  const item = products.find((item2) => item2.name === productInfo.name) || 0;

  return (
    <div className="product-card">
      <img
        data-testid={ `customer_products__img-card-bg-image-${productInfo.id}` }
        src={ productInfo.urlImage }
        alt={ productInfo.name }
        width="200px"
      />
      <p
        className="product-name"
        data-testid={ `customer_products__element-card-title-${productInfo.id}` }
      >
        { productInfo.name }
      </p>
      <p
        className="product-price"
        data-testid={ `customer_products__element-card-price-${productInfo.id}` }
      >
        { productInfo.price.replace('.', ',') }
      </p>
      <div className="buttons-add-remove">
        <button
          data-testid={ `customer_products__button-card-add-item-${productInfo.id}` }
          type="button"
          onClick={ () => {
            const index = products
              .findIndex((product) => product.name === productInfo.name);
            if (index !== MENOSUM) {
              const newProducts = [...products];
              newProducts[index].quantity += 1;
              return setProducts(newProducts);
            }
            setProducts((prev) => ([...prev, {
              id: productInfo.id, ...productInfo, quantity: 1 }]));
          } }
        >
          +
        </button>
        <input
          data-testid={ `customer_products__input-card-quantity-${productInfo.id}` }
          type="number"
          onChange={ ({ target: { value } }) => {
            const index = products
              .findIndex((product) => product.name === productInfo.name);
            if (index !== MENOSUM && Number(value) >= 0) {
              const newProducts = [...products];
              newProducts[index].quantity = Number(value);
              return setProducts(newProducts);
            }
            setProducts((prev) => ([...prev, {
              id: productInfo.id,
              ...productInfo,
              quantity: Number(value),
            }]));
          } }
          value={ item.quantity || 0 }
        />
        <button
          data-testid={ `customer_products__button-card-rm-item-${productInfo.id}` }
          type="button"
          onClick={ () => {
            const index = products
              .findIndex((product) => product.name === productInfo.name);
            if (index !== MENOSUM && products[index].quantity > 0) {
              const newProducts = [...products];
              newProducts[index].quantity -= 1;
              return setProducts(newProducts);
            }
          } }
        >
          -
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  productInfo: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    urlImage: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
