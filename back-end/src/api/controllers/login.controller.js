const { getByEmail } = require('../services/user.service');
const generateJWT = require('../auth/generateJWT');

const login = async (req, res) => {
  const { email } = req.body;

  const user = await getByEmail(email);

  const token = generateJWT(user);

  res.status(200).json({ token });
};

module.exports = {
  login,
};