const BlogPost = require('../services/blogPost');

const checkIfPostExists = async (req, res, next) => {
  const { id } = req.params;
  const post = await BlogPost.getById(id);

  if (post.message) {
    return res.status(404).json({ message: post.message });
  }
  
  next();
};

module.exports = checkIfPostExists;
