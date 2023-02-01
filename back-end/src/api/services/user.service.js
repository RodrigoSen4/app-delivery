const { Op } = require('sequelize');
const { User } = require('../../database/models');

const getSellers = () => User.findAll({ where: { role: 'seller' } });

const getByEmail = (email) => User.findOne({ where: { email } });

const getByName = (name) => User.findOne({ where: { name } });

const create = async ({ name, email, password }) => {
  const user = await User.create({ name, email, password });
  return user;
};

const createNewUser = async ({ name, email, password, role }) => {
  const newUser = await User.create({ name, email, password, role });
  return newUser;
};

const getUserAdm = async () => {
  const users = await User.findAll({
    where: {
      role: {
        [Op.not]: 'administrator',
      },
    },
  });
  return users;
};

module.exports = {
  getByEmail,
  getByName,
  create,
  getSellers,
  createNewUser,
  getUserAdm,
};