var express = require('express');
var router = express.Router();
const appointmentController = require('@src/controllers/appointment.controller');
const { errorHandler } = require('@src/utils/errors');
const { checkJwt } = require('@src/auth/auth0.auth');
const { authorize } = require('@src/middleware/authorize');
const {
  createAppointmentValidation,
  updateAppointmentStatusValidation,
  rescheduleAppointmentValidation
} = require('@src/validations/appointment.validation');
const { createAppointmentCheck } = require('@src/middleware/appointmentCheck');

// GET appointments
router.get(
  '/',
  checkJwt,
  errorHandler(async function (req, res, next) {
    const { page = 1, limit = 10 } = req.query;
    const appointments = await appointmentController.getAppointment(page, limit);
    res.json({ appointments });
  })
);

// GET appointment by id
router.get(
  '/:id',
  checkJwt,
  errorHandler(async function (req, res, next) {
    const id = req.params.id;
    const appointment = await appointmentController.getAppointmentById(id);
    return res.status(200).json({ appointment });
  })
);

// POST create appointment
router.post(
  '/',
  createAppointmentValidation,
  checkJwt,
  authorize(['USER']),
  createAppointmentCheck,
  errorHandler(async function (req, res, next) {
    const appointment = await appointmentController.createAppointment(req.body);
    return res.status(201).json({ appointment });
  })
);

// PUT update appointment status
router.put(
  '/:id/status',
  updateAppointmentStatusValidation,
  checkJwt,
  errorHandler(async function (req, res, next) {
    const appointment = await appointmentController.updateAppointmentStatus(req.params.id, req.body);
    return res.status(200).json({ appointment });
  })
);

// PUT reschedule appointment
router.put(
  '/:id/reschedule',
  rescheduleAppointmentValidation,
  checkJwt,
  errorHandler(async function (req, res, next) {
    const appointment = await appointmentController.rescheduleAppointment(req.params.id, req.body);
    return res.status(200).json({ appointment });
  })
);

/**
 * TODO:
 * - available appointment per day
 * - fully booked appointment per month
 */

module.exports = router;
