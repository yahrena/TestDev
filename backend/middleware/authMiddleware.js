const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.session.userRole === 'admin') {
    return next();
  } else {
    res.status(403).json({ error: 'Forbidden' });
  }
};

module.exports = { isAuthenticated, isAdmin };
