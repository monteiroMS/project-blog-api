const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const INVALID_FIELDS = 'Invalid fields';

const { JWT_SECRET: secret } = process.env;

const login = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== password) {
      throw new Error(INVALID_FIELDS);
    }

    const token = jwt.sign({ email: user.email }, secret, {
      expiresIn: '1d',
    });
  
    return token;
  } catch (error) {
    return { message: error.message };
  }
};

module.exports = {
  login,
};
