require('dotenv/config');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const generateJWT = (user) => {
  const jwtConfig = {
    algorithm: 'HS256',
  };

  const payload = { email: user.email };
  
  const token = jwt.sign(payload, JWT_SECRET, jwtConfig);
  return token;
};

module.exports = generateJWT;