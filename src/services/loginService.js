const { User } = require('../database/models');
const { createToken } = require('../middlewares/tokenAuthentication');

const loginService = async (email, password) => {
  const token = createToken(email);
  const user = await User.findOne({ where: { email, password } });
  if (user) {
    return token;
  }
  return { message: 'Invalid fields' };
};

module.exports = { loginService };