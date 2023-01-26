import PropTypes from 'prop-types';

function SelectSeller(props) {
  const { sellers } = props;

  return (
    <label htmlFor="seller-selector">
      Vendedor Responsável:
      <select
        data-testid="customer_checkout__select-seller"
        id="seller-selector"
      >
        {
          sellers.map((seller) => (
            <option
              value={ seller }
              key={ seller }
            >
              { seller }
            </option>))
        }
      </select>
    </label>
  );
}

SelectSeller.propTypes = {
  sellers: PropTypes.arrayOf().isRequired,
};

export default SelectSeller;
