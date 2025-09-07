const axios = require('axios');
const { createUser } = require('./user.service');
const userRepository = require('../database/repositories/user.repository');

const auth = async req => {
  const authData = {
    access_token: req.auth.token,
    refresh_token: req.auth.refresh_token,
    expires_in: req.auth.payload.exp
  };

  const user = await userRepository.findOne({ auth_id: req.auth.payload.sub });

  if (!user) {
    const auth0User = await getAuth0User(req.auth.token);

    const userData = {
      name: auth0User.name || '',
      first_name: auth0User.given_name || '',
      last_name: auth0User.family_name || '',
      email: auth0User.email,
      role: 'USER',
      auth_id: req.auth.payload.sub,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null
    };

    const savedUser = await createUser(userData);
    return { user: savedUser, ...authData };
  }
  return { user, ...authData };
};

const getAuth0User = async token => {
  const auth0User = await axios.get(`${process.env.AUTH0_ISSUER_BASE_URL}/userinfo`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return auth0User.data;
};

module.exports = { auth, getAuth0User };
