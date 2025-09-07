const mongoose = require('mongoose');
const APPOINTMENT_STATUS = require('@src/constants/appointment-status');

const appointmentSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: [APPOINTMENT_STATUS],
      required: true,
      default: APPOINTMENT_STATUS.PENDING
    },
    dentist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    reason: {
      type: String,
      required: true
    },
    isFirstTime: {
      type: Boolean,
      required: true
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at'
    }
  }
);

appointmentSchema.index({ created_at: 1 });
appointmentSchema.index({ updated_at: 1 });

const Appointment = mongoose.model('Appointment', appointmentSchema).on('index', error => {
  if (error) {
    console.error(error);
  }
});

module.exports = Appointment;
