const { loginAuth } = require('../middlewares/tokenAuthentication');
const { loginService } = require('../services/loginService');

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const { error } = loginAuth.validate({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const login = await loginService(email, password);

  if (login.message) {
    return res.status(400).json(login);
  }

  res.status(200).json({ token: login });
};

module.exports = loginController;