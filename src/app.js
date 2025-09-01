var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const database = require('./database');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

var app = express();

database.connection();
require('./database/models/user.model');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  const statusCode = err.status || err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === 'production';
  let response = {};

  // In production, hide sensitive error details for 500 errors
  if (isProduction && statusCode >= 500) {
    response = {
      message: 'Internal Server Error',
      error: 'Internal Server Error',
      statusCode: statusCode
    };
  } else {
    // Development or client errors (4xx) - show detailed errors
    const errorName = err.name || 'Internal Server Error';
    response = {
      message: err.message || 'Something went wrong',
      error: errorName,
      statusCode: statusCode
    };
  }

  res.status(statusCode);
  res.json(response);
});

module.exports = app;
