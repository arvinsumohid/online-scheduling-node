const mongoose = require('mongoose');
const ROLES = require('@src/constants/roles');
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: false,
      default: ''
    },
    auth_id: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ROLES,
      required: true,
      default: ROLES.USER
    },
    email: {
      type: String,
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

userSchema.index({ created_at: 1 });
userSchema.index({ updated_at: 1 });

const User = mongoose.model('User', userSchema).on('index', error => {
  if (error) {
    console.error(error);
  }
});

module.exports = User;
