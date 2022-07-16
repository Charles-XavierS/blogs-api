const { Router } = require('express');
const loginController = require('../controllers/loginController');

const loginRoute = Router();

loginRoute.post('/login', loginController);

module.exports = loginRoute;
