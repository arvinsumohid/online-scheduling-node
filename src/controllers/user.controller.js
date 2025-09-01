const userService = require('../services/user.service');
const { createError } = require('../utils/errors');

const getUserById = async id => {
  if (!id) {
    throw createError.badRequest('User id is required');
  }

  const user = await userService.getUserById(id);
  return user;
};

const getUser = async (page = 1, limit = 10) => {
  const userList = await userService.getUser(page, limit);
  return userList;
};

module.exports = { getUserById, getUser };
