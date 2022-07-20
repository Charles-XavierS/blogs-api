const { Router } = require('express');
const postController = require('../controllers/postController');
const postService = require('../services/postService');
const tokenValidation = require('../middlewares/tokenValidation');

const postRoute = Router();

postRoute.post('/post', tokenValidation, 
  postService.validatePost, postController.addPost);

module.exports = postRoute;