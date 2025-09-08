const { createError } = require('@src/utils/errors');
const userRepository = require('../database/repositories/user.repository');
const appointmentRepository = require('../database/repositories/appointment.repository');

const userIsMe = async (req, res, next) => {
  const user = await userRepository.findOne({ auth_id: req.auth.payload.sub });

  if (!user) {
    return createError.unauthorized();
  }

  if (user._id.toString() !== req.params.id) {
    return createError.forbidden();
  }

  next();
};

const isUserPartOfAppointment = async (req, res, next) => {
  const user = await userRepository.findOne({ auth_id: req.auth.payload.sub });
  const appointment = await appointmentRepository.findOne({ _id: req.params.id });

  if (!appointment) {
    return createError.badRequest('Appointment not found');
  }

  if (!user) {
    return createError.unauthorized();
  }

  if (
    appointment.patient.toString() !== user._id.toString() &&
    appointment.dentist.toString() !== user._id.toString()
  ) {
    return createError.forbidden();
  }

  next();
}

module.exports = { userIsMe, isUserPartOfAppointment };
