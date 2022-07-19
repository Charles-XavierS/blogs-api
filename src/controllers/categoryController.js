const categoryService = require('../services/categoryService');

const addCategory = async (req, res) => {
  const { dataValues: { id, name } } = await categoryService.addCategory(req.body);
  return res.status(201).json({ id, name });
};

const allCategories = async (_req, res) => {
  const categories = await categoryService.allCategories();
  return res.status(200).json(categories);
};

module.exports = { addCategory, allCategories };