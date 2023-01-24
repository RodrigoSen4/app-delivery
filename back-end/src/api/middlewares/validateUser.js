const { getByEmail, getByName } = require('../services/user.service');

// Função para validar email. Fonte: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
const completeEmail = (email) => {
  const re = /\S+@\S+/;
  return re.test(email);
};

const validateEmail = async (email) => {
  if (completeEmail(email) === false) {
    return { status: 400, message: 'Must be a valid email' };
  }

  const userEmail = await getByEmail(email);

  if (userEmail) {
    return { status: 409, message: 'User already registered' };
  }

}

const validatePassword = (password) => {
  if (!password || password.length < 6) {
    return { status: 400, message: 'Password length must be at least 6 characters long' }
  }
}

const validateName = async (name) => {
  if (!name || name.length < 12) {
    return { status: 400, message: 'Name length must be at least 12 characters long' }
  }

  const userName = await getByName(name);

  if (userName) {
    return { status: 409, message: 'User already registered' };
  }
}

const validateUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  let error = null;

  error = validatePassword(password);

  if (!error) {
    error = await validateEmail(email);
    if (!error) {
      error = await validateName(name);
    }
  }

  if (error) {
    return res.status(error.status).json(error.message);
  }

  next();
};

module.exports = validateUser;