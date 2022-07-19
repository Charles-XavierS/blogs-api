const Joi = require('joi');
const { Category } = require('../database/models');

const schema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': '"name" is required',
    'string.required': '"name" is required',
  }),
}).required();

const validateCategory = (req, res, next) => {
  const value = schema.validate(req.body);
  if (value.error) {
    const { error: { details: [{ message }] } } = value;
    return res.status(400).json({ message });
  }
  next();
};

const addCategory = async ({ name }) => {
  const category = await Category.create({ name });
  return category;
};

module.exports = { validateCategory, addCategory };