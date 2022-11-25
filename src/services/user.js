const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const MESSAGE_INVALID_FIELDS = 'Invalid fields';
const MESSAGE_ERROR_500 = 'Internal server error';
const MESSAGE_USER_NOT_FOUND = 'User does not exist';

const { JWT_SECRET: secret } = process.env;

const serialize = ({ id, displayName, email, image }) => (
  { id, displayName, email, image }
);

const login = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== password) {
      throw new Error(MESSAGE_INVALID_FIELDS);
    }

    const token = jwt.sign({ email: user.email, id: user.id }, secret, {
      expiresIn: '1d',
    });
  
    return token;
  } catch (error) {
    return { message: error.message };
  }
};

const createUser = async (newUser) => {
  try {
    const user = await User.create(newUser);

    if (!user) throw new Error(MESSAGE_ERROR_500);

    const token = await login(user.email, user.password);

    if (token.message) throw new Error(MESSAGE_ERROR_500);

    return token;
  } catch (error) {
    return { message: error.message };
  }
};

const getAll = async () => {
  try {
    const users = await User.findAll();
    return users.map(serialize);
  } catch (error) {
    return { message: MESSAGE_ERROR_500 };
  }
};

const getById = async (id) => {
  try {
    const user = await User.findByPk(id);

    if (!user) throw new Error(MESSAGE_USER_NOT_FOUND);

    return serialize(user);
  } catch (error) {
    return { message: error.message };
  }
};

const deleteById = async (id) => {
  const deleted = await User.destroy(
    { where: { id } },
  );
  return deleted;
};

module.exports = {
  login,
  createUser,
  getAll,
  getById,
  deleteById,
};
