const Joi = require('joi');

module.exports = Joi.object({
  statusCode: Joi.number().example(400),
  error: Joi.string().example('Error name'),
  message: Joi.string().example('Error description'),
});
