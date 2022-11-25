const Joi = require('joi');
const jwt = require('jsonwebtoken');
const BlogPost = require('../services/blogPost');

const MESSAGE = 'Unauthorized user';
const MESSAGE_MISSING_FIELDS = 'Some required fields are missing';

const secret = process.env.JWT_SECRET;

const schema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const checkReqBody = (req, res, next) => {
  const result = schema.validate(req.body);

  if (result.error) {
    return res.status(400).json({ message: MESSAGE_MISSING_FIELDS });
  }

  next();
};

const checkUserAuthorization = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { authorization } = req.headers;
    const post = await BlogPost.getById(id);
    const { id: userId } = jwt.verify(authorization, secret);

    if (post.userId !== userId) {
      throw new Error(MESSAGE);
    }
    
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = [
  checkReqBody,
  checkUserAuthorization,
];
