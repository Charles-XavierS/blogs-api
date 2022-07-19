const { Router } = require('express');
const userController = require('../controllers/userController');
const userService = require('../services/userService');
const tokenValidation = require('../middlewares/tokenValidation');

const userRoute = Router();

userRoute.get('/user', tokenValidation, userController.getAllUsers);
userRoute.get('/user/:id', tokenValidation, userController.getById);
userRoute.post('/user', userService.validateUser, userController.addUser);

module.exports = userRoute;