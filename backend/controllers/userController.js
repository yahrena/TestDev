const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createUser = async (req, res) => {
  const { name, lastname, email, password, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  try {
    const user = await User.create({ name, lastname, email, password: hashedPassword, role });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, lastname, email, role } = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.name = name;
      user.lastname = lastname;
      user.email = email;
      user.role = role;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createUser, getAllUsers, updateUser, deleteUser, getUserById };
