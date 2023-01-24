const { Router } = require('express');
const { createUser } = require('../controllers/user.controller');
const validateUser = require('../middlewares/validateUser');

const userRoute = Router();

userRoute.post('/register', validateUser, createUser);

module.exports = userRoute;
