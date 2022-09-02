const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required(),
});

const checkReqBody = (req, res, next) => {
  const result = schema.validate(req.body);

  if (result.error) {
    const [{ message }] = result.error.details;
    return res.status(400).json({ message });
  }

  next();
};

module.exports = {
  checkReqBody,
};
