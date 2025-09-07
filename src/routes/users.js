var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');
const { errorHandler } = require('../utils/errors');
const { checkJwt } = require('../auth/auth0.auth');
const {
  getUserByIdValidation,
  updateUserRoleValidation,
  updateUserValidation
} = require('../validations/user.validation');
const { authorize } = require('../middleware/authorize');
const { userIsMe } = require('../middleware/ownership');

/* GET users listing. */
router.get(
  '/',
  checkJwt,
  authorize(['ADMIN']),
  errorHandler(async function (req, res, next) {
    const { page = 1, limit = 10 } = req.query;
    const users = await userController.getUser(page, limit);
    res.json({ users });
  })
);

// GET user by id
router.get(
  '/:id',
  getUserByIdValidation,
  checkJwt,
  errorHandler(async function (req, res, next) {
    const id = req.params.id;
    const user = await userController.getUserById(id);
    return res.status(200).json({ user });
  })
);

// PUT update user role
router.put(
  '/:id/role',
  updateUserRoleValidation,
  checkJwt,
  authorize(['ADMIN']),
  errorHandler(async function (req, res, next) {
    const user = await userController.updateUser(req.params.id, req.body);
    return res.status(200).json({ user });
  })
);

// PUT update user
router.put(
  '/:id',
  updateUserValidation,
  checkJwt,
  authorize(['USER']),
  userIsMe,
  errorHandler(async function (req, res, next) {
    const user = await userController.updateUser(req.params.id, req.body);
    return res.status(200).json({ user });
  })
);

module.exports = router;
