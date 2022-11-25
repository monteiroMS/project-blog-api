const express = require('express');
const BlogPost = require('../controllers/blogPost');
const { authenticator } = require('../middlewares/auth');
const checkIfPostExists = require('../middlewares/checkIfPostExists');
const createBlogPostValidators = require('../middlewares/createBlogPostValidators');
const updatePostValidators = require('../middlewares/updatePostValidator');

const validators = [authenticator, ...createBlogPostValidators];
const [, checkUserAuthorization] = updatePostValidators;

const router = express.Router();

router
  .get('/', authenticator, BlogPost.getAll)
  .get('/search?', authenticator, BlogPost.getBySearchTerm)
  .get('/:id', authenticator, BlogPost.getById)
  .post('/', validators, BlogPost.createPost)
  .put('/:id', authenticator, updatePostValidators, BlogPost.updateById)
  .delete('/:id', authenticator, checkIfPostExists, checkUserAuthorization, BlogPost.deleteById);

module.exports = router;
