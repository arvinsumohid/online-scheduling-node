const Joi = require('joi');
const { validate } = require('./common');
const APPOINTMENT_STATUS = require('@src/constants/appointment-status');

const createAppointmentSchema = Joi.object({
  date: Joi.date().required(),
  time: Joi.string().required(),
  dentist: Joi.string().required(),
  patient: Joi.string().required(),
  reason: Joi.string().required(),
  isFirstTime: Joi.boolean().required()
});

const updateAppointmentStatusSchema = Joi.object({
  id: Joi.string().required(),
  status: Joi.string()
    .required()
    .valid(...Object.values(APPOINTMENT_STATUS))
});

const rescheduleAppointmentSchema = Joi.object({
  id: Joi.string().required(),
  date: Joi.date().required(),
  time: Joi.string().required()
});

module.exports = {
  createAppointmentValidation: (req, res, cb) => validate(createAppointmentSchema, req, res, cb),
  updateAppointmentStatusValidation: (req, res, cb) => validate(updateAppointmentStatusSchema, req, res, cb),
  rescheduleAppointmentValidation: (req, res, cb) => validate(rescheduleAppointmentSchema, req, res, cb)
};
