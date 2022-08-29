const express = require('express');
const User = require('../controllers/user');
const { loginValidator } = require('../middlewares/loginValidator');

const router = express.Router();

router
  .post('/', loginValidator, User.login);

module.exports = router;
