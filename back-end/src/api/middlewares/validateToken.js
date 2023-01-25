const { readFileSync } = require('fs');
const { join } = require('path');
const jwt = require('jsonwebtoken');

const path = '../../../jwt.evaluation.key';
const secret = readFileSync(join(__dirname, path), 'utf-8');

const tokenValidation = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  try {
    const data = jwt.verify(authorization, secret);
    req.payload = data;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { tokenValidation };