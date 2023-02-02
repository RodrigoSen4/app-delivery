import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ShopProvider from '../../context/ShopProvider';

const renderWithRoute = (component, route = '/') => {
  const history = createMemoryHistory({ initialEntries: [route] });

  return {
    ...render(
      <Router history={ history }>
        <ShopProvider>
          {component}
        </ShopProvider>
      </Router>,
    ),
    history,
  };
};

export default renderWithRoute;
