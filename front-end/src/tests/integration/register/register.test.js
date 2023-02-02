import React from 'react';
import { screen/* , waitFor */ } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRoute from '../../helpers/renderWithRoute';
import App from '../../../App';
/* import fakeLogin from './loginMocks'; */

describe('Register page tests', () => {
  it('should disable button if the name was not valid ', () => {
    renderWithRoute(<App />, '/');

    const emailField = screen.getByTestId('common_login__input-email');

    const buttonLogin = screen.getByTestId('common_login__button-login');

    userEvent.type(emailField, 'invalid@email,com');

    expect(buttonLogin).toBeDisabled();
  });

  /* it('should disable button if the password was not valid ', () => {
    renderWithRoute(<App />, '/');

    const emailField = screen.getByTestId('common_login__input-email');
    const passwordField = screen.getByTestId('common_login__input-password');
    const buttonLogin = screen.getByTestId('common_login__button-login');

    userEvent.type(emailField, 'invalid@email.com');
    userEvent.type(passwordField, '123456789');

    expect(buttonLogin).not.toBeDisabled();
  }); */

  /* it('should be able to do login', async () => {
    const { history } = renderWithRoute(<App />, '/');

    const emailField = screen.getByTestId('common_login__input-email');
    const passwordField = screen.getByTestId('common_login__input-password');
    const buttonLogin = screen.getByTestId('common_login__button-login');

    userEvent.type(emailField, 'adm@deliveryapp.com');
    userEvent.type(passwordField, '--adm2@21!!--');

    userEvent.click(buttonLogin);

    await waitFor(() => expect(history.location.pathname).toBe('/customer/products'));

    expect(localStorage.getItem('user')).toEqual()
  }); */
});
