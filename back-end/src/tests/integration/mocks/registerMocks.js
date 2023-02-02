const fakeNewUser = {
  name: 'new--user--02',
  email: 'user02@email.com',
  password: 'imANewUser02',
}

const fakeNewUserFromDb = {
  name: 'new--user--02',
  email: 'user02@email.com',
  role: 'client',
}

const fakeNewUserFromController = {
  name: 'new--user--02',
  email: 'user02@email.com',
  role: 'client',
  token: 'newusertokenhere',
}

module.exports = { fakeNewUser, fakeNewUserFromController, fakeNewUserFromDb };
