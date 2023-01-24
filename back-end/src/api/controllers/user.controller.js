const { create } = require('../services/user.service');
const md5 = require('md5');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const cryptedPassword = md5(password);

  const user = await create({ name, email, password: cryptedPassword });

  return res.status(201).end();
}

module.exports = {
  createUser,
}