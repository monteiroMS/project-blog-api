const BlogPost = require('../services/blogPost');

const createPost = async (req, res) => {
  const post = req.body;
  const blogPost = await BlogPost.createPost(post, req.userId);

  if (blogPost.message) {
    return res.status(blogPost.code).json({
      message: blogPost.message,
    });
  }

  return res.status(201).json(blogPost);
};

module.exports = {
  createPost,
};