const User = require('../database/models/user.model');
const { createError } = require('../utils/errors');

const createUser = async userData => {
  const user = new User();
  user.set(userData);
  const savedUser = await user.save();
  return savedUser;
};

const getUser = async (page = 1, limit = 10) => {
  const users = await User.find()
    .skip((page - 1) * limit)
    .limit(limit);

  return {
    users,
    page,
    limit,
    total: await User.countDocuments()
  };
};

const getUserById = async auth_id => {
  const userRes = await User.findOne(
    { auth_id },
    {
      _id: 1,
      auth_id: 1,
      name: 1,
      first_name: 1,
      last_name: 1,
      email: 1
    }
  );

  if (!userRes) {
    throw createError.notFound('User not found');
  }

  return userRes;
};

module.exports = { createUser, getUser, getUserById };
