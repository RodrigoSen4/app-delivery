const { Router } = require('express');
const { createUser, getAllSellers, adminCreateNewUser } = require('../controllers/user.controller');
const validateUser = require('../middlewares/validateUser');
const { tokenValidation } = require('../middlewares/validateToken');

const userRoute = Router();

userRoute.get('/sellers', getAllSellers);

userRoute.post('/register', validateUser, createUser);

userRoute.post('/register/admin', tokenValidation,validateUser, adminCreateNewUser);

module.exports = userRoute;
