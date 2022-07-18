const loginService = require('../services/loginService.js');

const login = async (req, res) => {
  const token = await loginService.getNewToken(req.body);
  
  if (token) {
    return res.status(200).json({ token });
  }
  return res.status(400).json({ message: 'Invalid fields' });
};

module.exports = { login };