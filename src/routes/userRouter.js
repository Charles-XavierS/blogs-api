const { Router } = require('express');
const userController = require('../controllers/userController');
const userService = require('../services/userService');

const userRoute = Router();

userRoute.post('/user', userService.validateUser, userController.addUser);

module.exports = userRoute;