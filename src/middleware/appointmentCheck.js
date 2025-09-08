const { createError } = require('@src/utils/errors');
const User = require('@src/database/models/user.model');

const createAppointmentCheck = (req, res, next) => {
  // check if dentist and patient are existing
  const dentist = User.findById(req.body.dentist);
  if (!dentist) {
    throw createError.notFound('Dentist not found');
  }

  const patient = User.findById(req.body.patient);
  if (!patient) {
    throw createError.notFound('Patient not found');
  }

  // check if dentist is role Doctor
  if (dentist.role !== 'DOCTOR') {
    throw createError.badRequest('Dentist is not a doctor');
  }

  // check if patient is role Patient
  if (patient.role !== 'PATIENT') {
    throw createError.badRequest('Patient is not a patient');
  }

  next();
};

module.exports = { createAppointmentCheck };
