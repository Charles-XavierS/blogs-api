const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { User } = require('../database/models');

const SECRET = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '30d',
  algorithm: 'HS256',
};

const addUser = async ({ displayName, email, password, image }) => {
  try {
    const newUser = await User.create({ displayName, email, password, image });
    const user = await User.findOne({ where: { email }, raw: true });
    if (newUser) {
      const { password: unknow, ...restOfUser } = user;
      const token = jwt.sign({ data: restOfUser }, SECRET, jwtConfig);
      return token;
    }
  } catch (_e) { return null; }
};

const schema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
}).required();

const validateUser = (req, res, next) => {
  const value = schema.validate(req.body);
  if (value.error) {
    const { error: { details: [{ message }] } } = value;
    return res.status(400).json({ message });
  }
  next();
};

module.exports = { addUser, validateUser };