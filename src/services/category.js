const { Category } = require('../database/models');

const BAD_REQUEST_MESSAGE = 'Bad request';
const INTERNAL_ERROR_MESSAGE = 'Internal server error';

const serialize = ({ id, name }) => ({ id, name });

const createCategory = async (name) => {
  try {
    const category = await Category.create({ name });

    if (!category) throw new Error(BAD_REQUEST_MESSAGE);

    return serialize(category);
  } catch (error) {
    return { message: error.message };
  }
};

const getAll = async () => {
  try {
    const categories = await Category.findAll();
    
    if (!categories) throw new Error(INTERNAL_ERROR_MESSAGE);

    return categories.map(serialize);
  } catch (error) {
    return { message: error.message };
  }
};

module.exports = {
  createCategory,
  getAll,
};