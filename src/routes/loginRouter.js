const { Router } = require('express');
const loginController = require('../controllers/loginController');
const loginService = require('../services/loginService');

const loginRoute = Router();

loginRoute.post('/login', loginService.validateLogin, loginController.login);

module.exports = loginRoute;
