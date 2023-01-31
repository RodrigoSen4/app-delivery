const md5 = require('md5');
const generateJWT = require('../auth/generateJWT');
const { create, getSellers, createNewUser } = require('../services/user.service');

const getAllSellers = async (_req, res) => {
  const sellers = await getSellers();
  return res.status(200).json(sellers);
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const cryptedPassword = md5(password);

  const user = await create({ name, email, password: cryptedPassword });

  const token = generateJWT(user);

  return res.status(201).json({ ...user, token });
};

const adminCreateNewUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const cryptedPassword = md5(password);

  const newUser = await createNewUser({ name, email, password: cryptedPassword, role });

  return res.status(201).json({ newUser });
};

module.exports = {
  createUser,
  getAllSellers,
  adminCreateNewUser,
};