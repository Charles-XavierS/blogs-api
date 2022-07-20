const postService = require('../services/postService');

const addPost = async (req, res) => {
  const { authorization } = req.headers;
  const { title, content, categoryIds } = req.body;
  const data = { title, content, categoryIds };

  const result = await postService.addPost(authorization, data);

  return res.status(201).json(result);
};

const allPosts = async (_req, res) => {
  const posts = await postService.allPosts();
  return res.status(200).json(posts);
};

const postById = async (req, res) => {
  const post = await postService.postById(req.params);
  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  return res.status(200).json(post);
};

module.exports = { addPost, allPosts, postById };
