const fakeLogin = {
  name: 'customer-user-01',
  email: 'customer@email.com',
  password: '123456789',
  role: 'client',
  token: 'validtokenhere',
};

const fakeLoginFromDb = {
  data: {
    name: 'customer-user-01',
    email: 'customer@email.com',
    role: 'client',
    token: 'validtokenhere',
  },
};

export { fakeLogin, fakeLoginFromDb };
