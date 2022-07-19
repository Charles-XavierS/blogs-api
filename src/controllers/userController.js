const userService = require('../services/userService');

const addUser = async (req, res) => {
  const token = await userService.addUser(req.body);
  if (token) {
    return res.status(201).json({ token });
  }
  return res.status(409).json({ message: 'User already registered' });
};

module.exports = { addUser };