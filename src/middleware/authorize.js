const userRepository = require('../database/repositories/user.repository');

const authorize = (allowedRoles = []) => {
  return async (req, res, next) => {
    const user = await userRepository.findOne({ auth_id: req.auth.payload.sub });

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient role' });
    }

    next();
  };
};

module.exports = { authorize };
