const Joi = require('joi');
const { validate } = require('./common');

const authValidationSchema = Joi.object({
  access_token: Joi.string().required()
});

module.exports = {
  authValidation: (req, res, cb) => validate(authValidationSchema, req, res, cb)
};
