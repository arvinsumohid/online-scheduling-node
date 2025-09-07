const Joi = require('joi');
const { validate } = require('./common');
const ROLES = require('@src/constants/roles');

const getUserByIdSchema = Joi.object({
  id: Joi.string().required()
});

const updateUserSchema = Joi.object({
  id: Joi.string().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required()
});

const updateUserRoleSchema = Joi.object({
  id: Joi.string().required(),
  role: Joi.string()
    .required()
    .valid(...Object.values(ROLES))
});

module.exports = {
  getUserByIdValidation: (req, res, cb) => validate(getUserByIdSchema, req, res, cb),
  updateUserValidation: (req, res, cb) => validate(updateUserSchema, req, res, cb),
  updateUserRoleValidation: (req, res, cb) => validate(updateUserRoleSchema, req, res, cb)
};
