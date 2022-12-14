const jwt = require('jsonwebtoken');
const User = require('../services/user');

const secret = process.env.JWT_SECRET;

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

const createUser = async (req, res) => {
  const token = await User.createUser(req.body);

  if (token.message) {
    return res.status(500).json({ message: token.message });
  }

  return res.status(201).json({ token });
};

const getAll = async (_req, res) => {
  const users = await User.getAll();

  if (users.message) {
    return res.status(500).json({
      message: users.message,
    });
  }

  return res.status(200).json(users);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const user = await User.getById(id);

  if (user.message) {
    return res.status(404).json({
      message: user.message,
    });
  }

  return res.status(200).json(user);
};

const deleteMe = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = jwt.verify(authorization, secret);
  const deleted = await User.deleteById(id);

  if (!deleted) {
    return res.status(500).json({ message: 'Something went wrong' });
  }

  return res.status(204).end();
};  

module.exports = {
  login,
  createUser,
  getAll,
  getById,
  deleteMe,
};
