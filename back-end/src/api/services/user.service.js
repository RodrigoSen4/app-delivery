const { User } = require('../../database/models');

const getByEmail = (email) => User.findOne({ where: { email } });

const getByName = (name) => User.findOne({ where: { name } });

const create = async ({ name, email, password }) => {
  const user = await User.create({ name, email, password });
  return user;
};

module.exports = {
  getByEmail,
  getByName,
  create,
};