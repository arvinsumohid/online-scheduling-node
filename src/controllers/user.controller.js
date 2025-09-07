const userService = require('../services/user.service');
const { createError } = require('../utils/errors');

const getUserById = async id => {
  const user = await userService.getUserById(id);

  return user;
};

const getUser = async (page = 1, limit = 10) => {
  const userList = await userService.getUser(page, limit);
  return userList;
};

const updateUser = async (id, userData) => {
  if (userData.first_name && userData.last_name) {
    userData.name = userData.first_name + ' ' + userData.last_name;
  }
  await userService.updateUser(id, userData);
  return userData;
};

module.exports = { getUserById, getUser, updateUser };
