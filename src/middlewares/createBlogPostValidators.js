const Joi = require('joi');
const { Category } = require('../database/models');

const MESSAGE_MISSING_FIELDS = 'Some required fields are missing';
const MESSAGE_NOT_FOUND = '\"categoryIds\" not found';

const schema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
});

const checkReqBody = (req, res, next) => {
  const result = schema.validate(req.body);

  if (result.error) {
    return res.status(400).json({ message: MESSAGE_MISSING_FIELDS });
  }

  next();
};

const checkIfCategoryExists = async (req, res, next) => {
  try {
    const { categoryIds } = req.body;
    const result = await Promise.all(categoryIds.map(async (category) => {
      const status = await Category.findByPk(category);
      return status;
    }));

    if (result.some((status) => !status)) throw new Error(MESSAGE_NOT_FOUND);

    next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = [
  checkReqBody,
  checkIfCategoryExists,
];
