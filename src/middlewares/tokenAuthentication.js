const Joi = require('joi');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '2h',
  algorithm: 'HS256',
};

const MESSAGE = 'Some required fields are missing';

const createToken = (data) => {
  const token = jwt.sign({ data }, SECRET, jwtConfig);
  return token;
};

const isTokenValid = (token) => {
  try {
    const { data } = jwt.verify(token, SECRET);
    return data;
  } catch (error) {
    return { message: error.message };
  }
};

const loginAuth = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': MESSAGE,
    'string.required': MESSAGE,
    'string.empty': MESSAGE,
  }),
  password: Joi.string().required().messages({
    'string.required': MESSAGE,
    'string.empty': MESSAGE,
  }),
});

module.exports = { loginAuth, createToken, isTokenValid };
