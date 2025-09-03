var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');
const { errorHandler } = require('../utils/errors');
const { checkJwt } = require('../auth/auth0.auth');
const { getUserByIdValidation } = require('../validations/user.validation');

/* GET users listing. */
router.get(
  '/',
  errorHandler(async function (req, res, next) {
    const { page = 1, limit = 10 } = req.query;
    const users = await userController.getUser(page, limit);
    res.json({ users });
  })
);

router.get(
  '/:id',
  checkJwt,
  getUserByIdValidation,
  errorHandler(async function (req, res, next) {
    const id = req.params.id;
    const user = await userController.getUserById(id);
    return res.status(200).json({ user });
  })
);

module.exports = router;
