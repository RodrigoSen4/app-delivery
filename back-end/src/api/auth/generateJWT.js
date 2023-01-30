const { readFileSync } = require('fs');
const { join } = require('path');
const jwt = require('jsonwebtoken');

const path = '../../../jwt.evaluation.key';
const secret = readFileSync(join(__dirname, path), 'utf-8');

const generateJWT = (user) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const payload = { id: user.id, email: user.email, role: user.role };

  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

module.exports = generateJWT;