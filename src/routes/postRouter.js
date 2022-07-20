const { Router } = require('express');
const postController = require('../controllers/postController');
const postService = require('../services/postService');
const tokenValidation = require('../middlewares/tokenValidation');

const postRoute = Router();

postRoute.get('/post', tokenValidation, postController.allPosts);
postRoute.get('/post/:id', tokenValidation, postController.postById);
postRoute.post('/post', tokenValidation, 
  postService.validatePost, postController.addPost);

module.exports = postRoute;