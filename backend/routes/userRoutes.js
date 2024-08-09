const express = require('express');
const { createUser, getAllUsers, updateUser, deleteUser, getUserById } = require('../controllers/userController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', createUser);
router.get('/', isAuthenticated, isAdmin, getAllUsers);
router.get('/:id', isAuthenticated, isAdmin, getUserById);
router.put('/:id', isAuthenticated, isAdmin, updateUser);
router.delete('/:id', isAuthenticated, isAdmin, deleteUser);

module.exports = router;
