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

const getAll = async (_req, res) => {
  const posts = await BlogPost.getAll();

  if (posts.message) return res.status(500).json({
    message: posts.message,
  });

  return res.status(200).json(posts);
};

module.exports = {
  createPost,
  getAll,
};