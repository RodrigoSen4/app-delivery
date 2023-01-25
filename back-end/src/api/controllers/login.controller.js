const { getByEmail } = require('../services/user.service');
const generateJWT = require('../auth/generateJWT');

const login = async (req, res) => {
  const { email } = req.body;

  const user = await getByEmail(email);
  const { name, role } = user;

  const token = generateJWT(user);

  res.status(200).json({ name, email, role, token });
};

module.exports = {
  login,
};