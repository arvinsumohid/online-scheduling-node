const Appointment = require('@src/database/models/appointment.model');
const { ApiError } = require('@src/utils/errors');

const getAppointmentById = async id => {
  const appointment = await Appointment.findById(id);
  return appointment;
};
const createAppointment = async appointmentData => {
  // check if appointment is available
  const appointment = await Appointment.findOne({
    date: appointmentData.date,
    time: appointmentData.time,
    dentist: appointmentData.dentist
  });
  if (appointment) {
    throw ApiError.badRequest('Appointment is not available');
  }

  const newAppointment = await Appointment.create(appointmentData);
  return newAppointment;
};
const updateAppointmentStatus = async (id, appointmentData) => {
  // check if appointment is existing
  const existingAppointment = await Appointment.findById(id);
  if (!existingAppointment) {
    throw ApiError.notFound('Appointment not found');
  }
  const appointment = await Appointment.findByIdAndUpdate(id, appointmentData, { new: true, runValidators: true });
  return appointment;
};
const rescheduleAppointment = async (id, appointmentData) => {
  // check if appointment is existing
  const existingAppointment = await Appointment.findById(id);
  if (!existingAppointment) {
    throw ApiError.notFound('Appointment not found');
  }

  // check if appointment is available
  const appointmentCheck = await Appointment.findOne({
    date: appointmentData.date,
    time: appointmentData.time,
    dentist: appointmentData.dentist
  });
  if (appointmentCheck) {
    throw ApiError.badRequest('Appointment is not available');
  }
  const appointment = await Appointment.findByIdAndUpdate(id, appointmentData, { new: true, runValidators: true });
  return appointment;
};

module.exports = { getAppointmentById, createAppointment, updateAppointmentStatus, rescheduleAppointment };
