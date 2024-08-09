const express = require('express');
const { login, logout, currentUser } = require('../controllers/authController');
const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/current-user', currentUser);

module.exports = router;
