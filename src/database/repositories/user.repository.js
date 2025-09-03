const User = require('../models/user.model');

const find = async (filter, projection = {}, options = {}, skip = 0, limit = 10) => {
  const userRes = await User.find(
    filter,
    projection,
    options
  )
    .skip(skip)
    .limit(limit);

  return userRes;
};

const findOne = async (filter, projection = {}, options = {}) => {
  const userRes = await User.findOne(
    filter,
    projection,
    options
  );

  return userRes;
};

const create = async (document, options = {}) => {
  const userRes = await User.create(document, options);

  return userRes;
};

const countDocuments = async (filter = {}, options = {}) => {
  const count = await User.countDocuments(filter, options);

  return count;
};

module.exports = { find, findOne, create, countDocuments };