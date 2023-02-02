import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRoute from '../../helpers/renderWithRoute';
import App from '../../../App';
import FakeLocalStorage from '../../helpers/FakeLocalStorage';
import { service } from '../../../API/requests';
import { productsFromDb } from '../mocks/productsMock';
import { fakeLogin, fakeLoginFromDb } from '../mocks/loginMocks';

describe('Login page tests', () => {
  global.localStorage = new FakeLocalStorage();

  beforeEach(() => {
    jest.spyOn(service, 'post').mockResolvedValue(fakeLoginFromDb);
    jest.spyOn(service, 'get').mockResolvedValue(productsFromDb);
    localStorage.clear();
  });

  afterEach(() => jest.clearAllMocks());

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

  it('should be able to do login', async () => {
    let hist;

    act(() => {
      const { history } = renderWithRoute(<App />, '/');
      hist = history;
    });

    const emailField = screen.getByTestId('common_login__input-email');
    const passwordField = screen.getByTestId('common_login__input-password');
    const buttonLogin = screen.getByTestId('common_login__button-login');

    userEvent.type(emailField, fakeLogin.email);
    userEvent.type(passwordField, fakeLogin.password);

    userEvent.click(buttonLogin);

    await waitFor(() => expect(hist.location.pathname).toBe('/customer/products'));

    const mockedUser = JSON.parse(localStorage.getItem('user'));

    expect(mockedUser).toEqual(fakeLoginFromDb.data);
  });

  it('should be able to access the /register', () => {
    const { history } = renderWithRoute(<App />, '/');

    const buttonRegister = screen.getByTestId('common_login__button-register');

    userEvent.click(buttonRegister);

    expect(history.location.pathname).toBe('/register');
  });
});
