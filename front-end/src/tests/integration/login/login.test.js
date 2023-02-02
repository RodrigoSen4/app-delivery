import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRoute from '../../helpers/renderWithRoute';
import App from '../../../App';
import fakeLogin from '../mocks/loginMocks';
import FakeLocalStorage from '../../helpers/FakeLocalStorage';
import { service } from '../../../API/requests';
import { productsFromDb } from '../mocks/productsMock';

describe('Login page tests', () => {
  global.localStorage = new FakeLocalStorage();

  it('should disable button if the email was not valid ', () => {
    renderWithRoute(<App />, '/');

    const emailField = screen.getByTestId('common_login__input-email');

    const buttonLogin = screen.getByTestId('common_login__button-login');

    userEvent.type(emailField, 'invalid@email,com');

    expect(buttonLogin).toBeDisabled();
  });

  it('should disable button if the password was not valid ', () => {
    renderWithRoute(<App />, '/');

    const emailField = screen.getByTestId('common_login__input-email');
    const passwordField = screen.getByTestId('common_login__input-password');
    const buttonLogin = screen.getByTestId('common_login__button-login');

    userEvent.type(emailField, 'invalid@email.com');
    userEvent.type(passwordField, '123456789');

    expect(buttonLogin).not.toBeDisabled();
  });

  /* it('should be able to do login', async () => {
    jest.spyOn(service, 'post').mockResolvedValue(fakeLogin);
    jest.spyOn(service, 'get').mockResolvedValue(productsFromDb);

    const { history } = renderWithRoute(<App />, '/');

    const emailField = screen.getByTestId('common_login__input-email');
    const passwordField = screen.getByTestId('common_login__input-password');
    const buttonLogin = screen.getByTestId('common_login__button-login');

    userEvent.type(emailField, 'user@email.com');
    userEvent.type(passwordField, '123456789');

    userEvent.click(buttonLogin);

    expect(history.location.pathname).toBe('/customer/products');

    expect(localStorage.getItem('user')).toEqual()
  }); */
});
