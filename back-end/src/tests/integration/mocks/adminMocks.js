const fakeAdmin = {
  name: 'user--adm--01',
  email: 'useradmin01@email.com',
  password: 'superAdmin12345',
  token: 'superAdminToken',
};

const resolvedToken = {
  id: 1,
  email: 'useradmin01@email.com',
  role: 'administrator'
}

const newFakeAdmin = {
  name: 'user--adm--02',
  email: 'useradmin02@email.com',
  role: 'administrator',
  password: 'subAdmin12345',
};

const newFakeAdminFromDb = {
  id: 2,
  name: 'user--adm--02',
  email: 'useradmin02@email.com',
  role: 'administrator',
  password: 'bc22f462f16f8507489aaa8fedefaef4',
};

const allAdms = [fakeAdmin];

module.exports = { resolvedToken, newFakeAdmin, newFakeAdminFromDb, fakeAdmin, allAdms };
