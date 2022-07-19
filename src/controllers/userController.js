const userService = require('../services/userService');

const addUser = async (req, res) => {
  const token = await userService.addUser(req.body);
  if (token) {
    return res.status(201).json({ token });
  }
  return res.status(409).json({ message: 'User already registered' });
};

const getAllUsers = async (_req, res) => {
  const users = await userService.getAllUsers();
  return res.status(200).json(users);
};

module.exports = { addUser, getAllUsers };