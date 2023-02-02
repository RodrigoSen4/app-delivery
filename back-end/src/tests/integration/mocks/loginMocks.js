const fakeUserFromDB = {
  name: 'user01',
  email: 'user@email.com',
  role: 'client',
  password: '25f9e794323b453885f5181f1b624d0b',
}

const fakeUserFromController = {
  name: 'user01',
  email: 'user@email.com',
  role: 'client',
  token: 'thereisatokenhere',
}

module.exports = { fakeUserFromDB, fakeUserFromController };
