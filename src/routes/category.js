const express = require('express');
const Category = require('../controllers/category');
const { authenticator } = require('../middlewares/auth');
const { checkReqBody } = require('../middlewares/createCategoryValidator');

const router = express.Router();

const CREATE_MIDDLEWARES = [authenticator, checkReqBody];

router
  .post('/', CREATE_MIDDLEWARES, Category.createCategory);

module.exports = router;
