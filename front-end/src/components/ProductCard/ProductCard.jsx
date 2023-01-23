import PropTypes from 'prop-types';

function ProductCard({ props }) {
  const { name, price, urlImage } = props;

  return (
    <div>
      <p data-testid="customer_products__element-card-price">{ price }</p>
      <img
        data-testid="customer_products__img-card-bg-image"
        src={ urlImage }
        alt={ name }
        width="200px"
      />
      <p data-testid="customer_products__element-card-title">{ name }</p>
    </div>
  );
}

ProductCard.propTypes = {
  props: PropTypes.objectOf().isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  urlImage: PropTypes.string.isRequired,
};

export default ProductCard;
