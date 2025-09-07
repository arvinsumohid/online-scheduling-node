const appointmentService = require('@src/services/appointment.service');

const getAppointment = async (page = 1, limit = 10) => {
  const appointmentList = await appointmentService.getAppointment(page, limit);
  return appointmentList;
};
const getAppointmentById = async id => {
  const appointment = await appointmentService.getAppointmentById(id);
  return appointment;
};
const createAppointment = async appointmentData => {
  const appointment = await appointmentService.createAppointment(appointmentData);
  return appointment;
};
const updateAppointmentStatus = async (id, appointmentData) => {
  const appointment = await appointmentService.updateAppointmentStatus(id, appointmentData);
  return appointment;
};
const rescheduleAppointment = async (id, appointmentData) => {
  const appointment = await appointmentService.rescheduleAppointment(id, appointmentData);
  return appointment;
};

module.exports = {
  getAppointment,
  getAppointmentById,
  createAppointment,
  updateAppointmentStatus,
  rescheduleAppointment
};
