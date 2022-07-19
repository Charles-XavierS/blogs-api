const categoryService = require('../services/categoryService');

const addCategory = async (req, res) => {
  const { dataValues: { id, name } } = await categoryService.addCategory(req.body);
  return res.status(201).json({ id, name });
};

module.exports = { addCategory };