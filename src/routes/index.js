var express = require('express');
var router = express.Router();
const { createError } = require('../utils/errors');

/* GET home page. */
router.get('/', function (req, res, next) {
  throw createError.unauthorized();
});

module.exports = router;
