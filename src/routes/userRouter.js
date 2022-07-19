const { Router } = require('express');
const userController = require('../controllers/userController');
const userService = require('../services/userService');
const tokenValidation = require('../middlewares/tokenValidation');

const userRoute = Router();

userRoute.get('/user', tokenValidation, userController.getAllUsers);
userRoute.post('/user', userService.validateUser, userController.addUser);

module.exports = userRoute;