const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { BlogPost, PostCategory, User, Category } = require('../database/models');

const categoryService = require('./categoryService');

const postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
}).required();

const existingCategory = async ({ categoryIds }) => {
  const categories = await categoryService.allCategories();
  const categoriesList = categories.map(({ id }) => id);
  return categoriesList.some((id) => categoryIds.includes(id));
};

const validatePost = async (req, res, next) => {
  const value = postSchema.validate(req.body);
  if (value.error) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  if ((await existingCategory(req.body)) === false) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }

  next();
};

const addPost = async (authorization, data) => {
  const { title, content, categoryIds } = data;

  const decoded = jwt.verify(authorization, process.env.JWT_SECRET);
  const { id: userId } = decoded.data;

  const published = new Date().getTime();
  const updated = new Date().getTime();
  
  const newPost = await BlogPost.create({ title,
    content,
    userId,
    categoryIds,
    published,
    updated });

  // https://sebhastian.com/sequelize-bulk-create/
  const categories = categoryIds.map((categoryId) => ({ postId: newPost.id, categoryId }));
  PostCategory.bulkCreate(categories);

  const result = await BlogPost.findOne({ where: { title } });
  return result;
};

// https://sebhastian.com/sequelize-include/
const allPosts = async () => {
  const getPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },

      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return getPosts;
};

module.exports = { validatePost, addPost, allPosts };