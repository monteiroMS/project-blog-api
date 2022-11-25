const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { BlogPost, PostCategory } = require('../database/models');
const config = require('../database/config/config');
const { User, Category } = require('../database/models');

const MESSAGE_SERVER_ERROR = 'Internal Server Error';
const MESSAGE_NOT_FOUND = 'Post does not exist';

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

const getAll = async () => {
  try {
    const result = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories' },
      ],
    });
    if (!result) throw new Error(MESSAGE_SERVER_ERROR);
    return result;
  } catch (error) {
    return { message: error.message };
  }
};

const getById = async (id) => {
  try {
    const post = await BlogPost.findOne({
      where: { id },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories' },
      ],
    });
    if (!post) throw new Error(MESSAGE_NOT_FOUND);
    return post;
  } catch (error) {
    return { message: error.message };
  }
};

const updateById = async (id, changes) => {
  const updated = await BlogPost.update(
    { ...changes },
    { where: { id } },
  );
  return updated;
};

const deleteById = async (id) => {
  const deleted = await BlogPost.destroy({
    where: { id },
  });
  return deleted;
};

const getBySearchTerm = async (query) => {
  const posts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { content: { [Op.like]: `%${query}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });
  return posts;
};

module.exports = {
  createPost,
  getAll,
  getById,
  updateById,
  deleteById,
  getBySearchTerm,
};
