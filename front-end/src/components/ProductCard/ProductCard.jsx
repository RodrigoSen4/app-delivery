import PropTypes from 'prop-types';
import { useContext } from 'react';
import ShopContext from '../../context/ShopContext';

const MENOSUM = -1;

function ProductCard({ props }) {
  const { id, name, price, urlImage } = props;
  const { products, setProducts } = useContext(ShopContext);

  const item = products.find((item2) => item2.name === name) || 0;

  return (
    <div>
      <p data-testid={ `customer_products__element-card-price-${id}` }>
        { price.replace('.', ',') }
      </p>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ name }
        width="200px"
      />
      <p data-testid={ `customer_products__element-card-title-${id}` }>{ name }</p>
      <div>
        <button
          data-testid={ `customer_products__button-card-add-item-${id}` }
          type="button"
          onClick={ () => {
            const index = products.findIndex((product) => product.name === name);
            console.log(index);
            if (index !== MENOSUM) {
              const newProducts = [...products];
              newProducts[index].quantity += 1;
              return setProducts(newProducts);
            }
            setProducts((prev) => ([...prev, { id, ...props, quantity: 1 }]));
          } }
        >
          +
        </button>
        <input
          data-testid={ `customer_products__input-card-quantity-${id}` }
          type="number"
          onChange={ ({ target: { value } }) => {
            const index = products.findIndex((product) => product.name === name);
            if (index !== MENOSUM && Number(value) >= 0) {
              const newProducts = [...products];
              newProducts[index].quantity = Number(value);
              return setProducts(newProducts);
            }
            setProducts((prev) => ([...prev, { id, ...props, quantity: Number(value) }]));
          } }
          value={ item.quantity || 0 }
        />
        <button
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          type="button"
          onClick={ () => {
            const index = products.findIndex((product) => product.name === name);
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
  props: PropTypes.objectOf().isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  urlImage: PropTypes.string.isRequired,
};

export default ProductCard;
