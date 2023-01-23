const { Router } = require('express');
const { login } = require('../controllers/login.controller');
const validateLogin = require('../middlewares/validateLogin');

const loginRoute = Router();

loginRoute.post('/login', validateLogin, login);

module.exports = loginRoute;
