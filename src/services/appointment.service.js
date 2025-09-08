const appointmentRepository = require('@src/database/repositories/appointment.repository');
const { createError } = require('@src/utils/errors');

const getAppointmentById = async (id) => {
  const appointment = await appointmentRepository.findOne({ _id: id });
  if (!appointment) {
    throw createError.notFound('Appointment not found');
  }
  return appointment;
};

const createAppointment = async (appointmentData) => {
  // check if appointment is available
  const appointment = await appointmentRepository.findOne({
    date: appointmentData.date,
    time: appointmentData.time,
    dentist: appointmentData.dentist
  });
  if (appointment) {
    throw createError.badRequest('Appointment is not available');
  }

  const newAppointment = await appointmentRepository.create(appointmentData);
  return newAppointment;
};
const updateAppointmentStatus = async (id, appointmentData) => {
  // check if appointment is existing
  const existingAppointment = await appointmentRepository.findOne({ _id: id });
  if (!existingAppointment) {
    throw createError.notFound('Appointment not found');
  }

  const appointment = await appointmentRepository.updateOne(id, appointmentData, { new: true, runValidators: true });
  return appointment;
};
const rescheduleAppointment = async (id, appointmentData) => {
  // check if appointment is existing
  const existingAppointment = await appointmentRepository.findOne({ _id: id });
  if (!existingAppointment) {
    throw createError.notFound('Appointment not found');
  }

  // check if appointment is available
  const appointmentCheck = await appointmentRepository.findOne({
    date: appointmentData.date,
    time: appointmentData.time,
    dentist: appointmentData.dentist
  });
  if (appointmentCheck) {
    throw createError.badRequest('Appointment is not available');
  }
  const appointment = await appointmentRepository.updateOne(id, appointmentData, { new: true, runValidators: true });
  return appointment;
};

module.exports = { getAppointmentById, createAppointment, updateAppointmentStatus, rescheduleAppointment };
