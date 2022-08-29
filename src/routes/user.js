const express = require('express');
// const User = require('../controllers/user');

const router = express.Router();

router
  .post('/', (_req, res) => res.status(200).json('it works'));

module.exports = router;
