const { Router } = require('express');
const { createUser, getAllSellers } = require('../controllers/user.controller');
const validateUser = require('../middlewares/validateUser');

const userRoute = Router();

userRoute.get('/sellers', getAllSellers);

userRoute.post('/register', validateUser, createUser);

module.exports = userRoute;
