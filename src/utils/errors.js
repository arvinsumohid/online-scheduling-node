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

export { ApiError, setError, createError, errorHandler };
