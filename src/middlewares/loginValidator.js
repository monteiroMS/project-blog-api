const Joi = require('joi');

const MESSAGE = { message: 'Some required fields are missing' };

const schema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const loginValidator = (req, res, next) => {
  const result = schema.validate(req.body);

  if (result.error) {
    return res.status(400).json(MESSAGE);
  }

  next();
};

module.exports = {
  loginValidator,
};