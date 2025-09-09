const Appointment = require('../models/appointment.model');

const find = async (filter, projection = {}, options = {}, skip = 0, limit = 10) => {
  const userRes = await Appointment.find(filter, projection, options).skip(skip).limit(limit);

  return userRes;
};

const findOne = async (filter, projection = {}, options = {}) => {
  const userRes = await Appointment.findOne(filter, projection, options);

  return userRes;
};

const create = async (document, options = {}) => {
  const userRes = await Appointment.create(document, options);

  return userRes;
};

const updateOne = async (filter, update, options = {}) => {
  const userRes = await Appointment.updateOne(filter, update, options);

  return userRes;
};

const countDocuments = async (filter = {}, options = {}) => {
  const count = await Appointment.countDocuments(filter, options);

  return count;
};

module.exports = { find, findOne, create, updateOne, countDocuments };
