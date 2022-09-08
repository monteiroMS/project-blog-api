const express = require('express');
const BlogPost = require('../controllers/blogPost');
const { authenticator } = require('../middlewares/auth');
const createBlogPostValidators = require('../middlewares/createBlogPostValidators');

const validators = [authenticator, ...createBlogPostValidators];

const router = express.Router();

router
  .get('/', authenticator, BlogPost.getAll)
  .post('/', validators, BlogPost.createPost);

module.exports = router;
