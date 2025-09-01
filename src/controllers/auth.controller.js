const authService = require('../services/auth.service');

const auth = async req => {
  const authData = await authService.auth(req);
  return authData;
};

module.exports = { auth };
