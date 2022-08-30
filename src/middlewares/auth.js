const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const { JWT_SECRET: secret } = process.env;
const NOT_FOUND_MESSAGE = 'Token not found';
const INVALID_TOKEN_MESSAGE = 'Expired or invalid token';

const authenticator = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: NOT_FOUND_MESSAGE });
    }

    const { email } = jwt.verify(authorization, secret);
    const { id } = await User.findOne({ where: { email } });
    req.userId = id;

    next();
  } catch (error) {
    return res.status(401).json({
      message: INVALID_TOKEN_MESSAGE,
    });
  }
};

module.exports = {
  authenticator,
};