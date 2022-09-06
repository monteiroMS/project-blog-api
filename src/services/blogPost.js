const Sequelize = require('sequelize');
const { BlogPost, PostCategory } = require('../database/models');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const serialize = ({ id, title, content, userId, published, updated }) => (
  { id, title, content, userId, published, updated }
);

const createPost = async (post, userId) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const blogPost = await BlogPost.create(
        { ...post, userId },
        { transaction: t },
      );

      const postCategories = post.categoryIds.map((category) => ({
        postId: blogPost.id,
        categoryId: category,
      }));

      await PostCategory.bulkCreate(postCategories, { transaction: t });

      return blogPost;
    });
    return serialize(result);
  } catch (error) {
    return { code: 500, message: error.message };
  }
};

module.exports = {
  createPost,
};