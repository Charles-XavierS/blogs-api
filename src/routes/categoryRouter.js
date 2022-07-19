const { Router } = require('express');
const categoryController = require('../controllers/categoryController');
const categoryService = require('../services/categoryService');
const tokenValidation = require('../middlewares/tokenValidation');

const categoryRoute = Router();

categoryRoute.get('/categories', tokenValidation, categoryController.allCategories);
categoryRoute.post('/categories', tokenValidation,
  categoryService.validateCategory, categoryController.addCategory);

module.exports = categoryRoute;