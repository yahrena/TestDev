const bcrypt = require('bcryptjs');
const User = require('../models/User');

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.userId = user.id;
      req.session.userRole = user.role;
      res.json({ message: 'Logged in successfully', user });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Logged out successfully' });
  });
};

const currentUser = (req, res) => {
  if (req.session.userId) {
    User.findByPk(req.session.userId).then(user => {
      res.json(user);
    }).catch(error => {
      res.status(500).json({ error: error.message });
    });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
};

module.exports = { login, logout, currentUser };
