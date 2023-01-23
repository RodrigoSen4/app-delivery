const { User } = require('../../database/models');

const getByEmail = (email) => User.findOne({ where: { email } });

module.exports = {
  getByEmail,
}