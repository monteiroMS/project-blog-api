const express = require('express');
const createUserValidator = require('../middlewares/createUserValidators');
const User = require('../controllers/user');

const router = express.Router();

router
  .post('/', createUserValidator, User.createUser);

module.exports = router;
