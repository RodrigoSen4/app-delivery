import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { getSellers } from '../../API/requests';

function SelectSeller({ orderInfo: { order, setOrder } }) {
  const [sellers, setSellers] = useState([]);

  const changeInput = ({ target: { value, name } }) => {
    setOrder({ ...order, saleInfo: { ...order.saleInfo, [name]: Number(value) } });
  };

  const saveSellers = async () => {
    const sellersFromDB = await getSellers();
    setSellers(sellersFromDB);
  };

  useEffect(() => {
    saveSellers();
  }, []);

  return (
    <label htmlFor="seller-selector">
      <span>Vendedor Responsável:</span>
      <select
        data-testid="customer_checkout__select-seller"
        id="seller-selector"
        onClick={ changeInput }
        name="sellerId"
      >
        {
          sellers.map((seller) => (
            <option
              value={ seller.id }
              key={ seller.name }
            >
              { seller.name }
            </option>))
        }
      </select>
    </label>
  );
}

SelectSeller.propTypes = {
  orderInfo: PropTypes.shape({
    order: PropTypes.shape({
      saleInfo: PropTypes.shape({
        sellerId: PropTypes.number,
        totalPrice: PropTypes.number,
        deliveryAddress: PropTypes.string,
        deliveryNumber: PropTypes.string,
      }),
    }),
    setOrder: PropTypes.func,
  }).isRequired,
};

export default SelectSeller;
