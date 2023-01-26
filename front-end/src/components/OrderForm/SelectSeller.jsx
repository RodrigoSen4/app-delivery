/* import PropTypes from 'prop-types'; */
import { useState, useEffect } from 'react';
import { getSellers } from '../../API/requests';

function SelectSeller() {
  const [sellers, setSellers] = useState([]);

  const saveSellers = async () => {
    const sellersFromDB = await getSellers();
    setSellers(sellersFromDB);
  };

  useEffect(() => {
    saveSellers();
  }, []);

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
              value={ seller.name }
              key={ seller.name }
            >
              { seller.name }
            </option>))
        }
      </select>
    </label>
  );
}

export default SelectSeller;
