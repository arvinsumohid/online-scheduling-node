const Joi = require('joi');
const { validate } = require('./common');

const getUserByIdSchema = Joi.object({
  id: Joi.string().required()
});

module.exports = {
  getUserByIdValidation: (req, res, cb) => validate(getUserByIdSchema, req, res, cb)
};
