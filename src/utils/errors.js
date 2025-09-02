class ApiError extends Error {
  statusCode;
  status;
  name;

  constructor(message, statusCode = 500, errorName = 'Internal Server Error') {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode;
    this.name = errorName;
  }
}

const setError = (status, message) => {
  const err = new ApiError(message, status);
  return err;
};

const createError = {
  badRequest: (message = 'Bad Request') => new ApiError(message, 400, 'Bad Request'),
  unauthorized: (message = 'Unauthorized') => new ApiError(message, 401, 'Unauthorized'),
  forbidden: (message = 'Forbidden') => new ApiError(message, 403, 'Forbidden'),
  notFound: (message = 'Not Found') => new ApiError(message, 404, 'Not Found'),
  conflict: (message = 'Conflict') => new ApiError(message, 409, 'Conflict'),
  internal: (message = 'Internal Server Error') => new ApiError(message, 500, 'Internal Server Error')
};

const errorHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const appErrorHandling = (err, req, res, next) => {
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
}

module.exports = { ApiError, setError, createError, errorHandler, appErrorHandling };
