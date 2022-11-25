const express = require('express');
const BlogPost = require('../controllers/blogPost');
const { authenticator } = require('../middlewares/auth');
const createBlogPostValidators = require('../middlewares/createBlogPostValidators');
const updatePostValidators = require('../middlewares/updatePostValidator');

const validators = [authenticator, ...createBlogPostValidators];

const router = express.Router();

router
  .get('/', authenticator, BlogPost.getAll)
  .get('/:id', authenticator, BlogPost.getById)
  .post('/', validators, BlogPost.createPost)
  .put('/:id', authenticator, updatePostValidators, BlogPost.updateById);

module.exports = router;
