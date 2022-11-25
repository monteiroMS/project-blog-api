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

  if (posts.message) {
    return res.status(500).json({ message: posts.message });
  }

  return res.status(200).json(posts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const post = await BlogPost.getById(id);

  if (post.message) {
    return res.status(404).json({ message: post.message });
  }
  
  return res.status(200).json(post);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const [updated] = await BlogPost.updateById(id, { ...req.body });

  if (!updated) {
    return res.status(500).json({ message: 'Internal Server Error' });
  } 

  const post = await BlogPost.getById(id);

  return res.status(200).json(post);
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  const deleted = await BlogPost.deleteById(id);

  if (!deleted) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  return res.status(204).end();
};

module.exports = {
  createPost,
  getAll,
  getById,
  updateById,
  deleteById,
};