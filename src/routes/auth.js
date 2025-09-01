var express = require('express');
const axios = require('axios');
var router = express.Router();
const { checkJwt } = require('../auth/auth0.auth');
const User = require('../database/models/user.model');
const authController = require('../controllers/auth.controller');
const { errorHandler } = require('../utils/errors');

router.get(
  '/',
  checkJwt,
  errorHandler(async function (req, res, next) {
    const authData = await authController.auth(req);
    return res.status(200).json(authData);
  })
);

module.exports = router;
