const { Router } = require('express');
const { 
    createUser, 
    getAllSellers, 
    adminCreateNewUser, 
    getUsersAdm, 
    delUser,
} = require('../controllers/user.controller');
const validateUser = require('../middlewares/validateUser');
const { tokenValidationAdm } = require('../middlewares/validateToken');

const userRoute = Router();

userRoute.get('/sellers', getAllSellers);

userRoute.post('/register', validateUser, createUser);

userRoute.post('/register/admin', tokenValidationAdm, validateUser, adminCreateNewUser);

userRoute.get('/users', getUsersAdm);

userRoute.delete('/delete', delUser);

module.exports = userRoute;
