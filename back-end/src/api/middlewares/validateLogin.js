const { getByEmail } = require('../services/user.service');

// Função para validar email. Fonte: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
const completeEmail = (email) => {
  const re = /\S+@\S+/;
  return re.test(email);
};

const validateEmail = (email) => {
  if (completeEmail(email) === false) {
    return { status: 400, message: 'Must be a valid email' };
  }
}

const validatePassword = (password) => {
  if (!password || password.length < 6) {
    return { status: 400, message: 'Password length must be at least 6 characters long' }
  }
}

const validateUser = async (email, password) => {
  const user = await getByEmail(email);

  if (!user || user.password !== password) {
    return { status: 404 , message: 'User not found'};
  }
}

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  let error = null;

  error = validatePassword(password);

  if (!error) {
    error = validateEmail(email);
    if (!error) {
      error = await validateUser(email, password);
    }
  }

  if (error) {
    return res.status(error.status).json(error.message);
  }

  next();
};

module.exports = validateLogin;