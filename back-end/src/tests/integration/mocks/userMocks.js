const customer01 = {
  name: 'customer--01',
  email: 'customer@email.com',
  role: 'customer',
  token: 'customerToken',
};

const customer01ResolvedToken = {
  id: 1,
  email: customer01.email,
  role: customer01.role,
};

module.exports = { customer01, customer01ResolvedToken };
