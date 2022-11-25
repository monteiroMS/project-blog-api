const express = require('express');
const createUserValidator = require('../middlewares/createUserValidators');
const User = require('../controllers/user');
const { authenticator } = require('../middlewares/auth');

const router = express.Router();

router
  .post('/', createUserValidator, User.createUser)
  .get('/', authenticator, User.getAll)
  .get('/:id', authenticator, User.getById)
  .delete('/me', authenticator, User.deleteMe);

module.exports = router;
