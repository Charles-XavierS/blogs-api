const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const SECRET = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '30d',
  algorithm: 'HS256',
};

const getNewToken = async ({ email, password }) => {
  const user = await User.findOne({ where: { email }, raw: true });
  if (!user || user.password !== password) return null;

  const { password: unknow, ...restOfUser } = user;
  const token = jwt.sign({ data: restOfUser }, SECRET, jwtConfig);
  return token;
};

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

module.exports = { getNewToken, validateLogin };