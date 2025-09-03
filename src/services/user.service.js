const userRepository = require('../database/repositories/user.repository');
const { createError } = require('../utils/errors');

const createUser = async (userData) => {
  const savedUser = await userRepository.create(userData);
  return savedUser;
};

const getUser = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const users = await userRepository.find({}, {}, {}, skip, limit);

  return {
    users: users || [],
    page,
    limit,
    total: await userRepository.countDocuments() || 0
  };
};

const getUserById = async (auth_id) => {
  const userRes = await userRepository.findOne(
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
