const User = require('../services/user');

const login = async (req, res) => {
  const { email, password } = req.body;

  const token = await User.login(email, password);

  if (token.message) {
    return res.status(400).json({
      message: token.message,
    });
  }

  return res.status(200).json({ token });
};

module.exports = {
  login,
};
