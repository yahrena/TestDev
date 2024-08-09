const express = require('express');
const { createTask, getAllTasks, updateTask, deleteTask, getTaskById, getTasksByUser, getTasksByUserId } = require('../controllers/taskController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', isAuthenticated, createTask);
router.get('/', isAuthenticated, getAllTasks);
router.get('/byId/:id', isAuthenticated, getTaskById);
router.get('/byUser', isAuthenticated, getTasksByUser);
router.get('/byUserId/:userId', isAuthenticated, getTasksByUserId);
router.put('/:id', isAuthenticated, updateTask);
router.delete('/:id', isAuthenticated, deleteTask);

module.exports = router;
