const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const tokenValidation = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  try {
    const data = jwt.verify(authorization, secret);
    req.payload = data;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  };
};

module.exports = { tokenValidation };