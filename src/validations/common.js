const validate = (schema, req, res, cb) => {
  let body = Object.assign({}, req.params, req.query);
  if (req.method === 'POST' || req.method === 'PUT') {
    body = Object.assign(body, req.body);
  }

  const { error } = schema.validate(body);
  if (error) {
    const errors = error.details.map(detail => ({
      key: detail.context.key,
      message: detail.message
    }));
    res.status(422).send({
      success: false,
      errors
    });
  } else {
    cb();
  }
};

module.exports = { validate };
