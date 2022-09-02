const Category = require('../services/category');

const createCategory = async (req, res) => {
  const { name } = req.body;

  const category = await Category.createCategory(name);

  if (category.message) {
    return res.status(400).json({ message: category.message });
  }

  return res.status(201).json(category);
};

const getAll = async (_req, res) => {
  const categories = await Category.getAll();

  if (categories.message) {
    return res.status(500).json({ message: categories.message });
  }

  return res.status(200).json(categories);
};

module.exports = {
  createCategory,
  getAll,
};