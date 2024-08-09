const Task = require('../models/Task');

const createTask = async (req, res) => {
  const { name, description, status, Pid_person } = req.body;
  try {
    const task = await Task.create({ name, description, status, Pid_person });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { name, description, status } = req.body;
  try {
    const task = await Task.findByPk(id);
    if (task) {
      task.name = name;
      task.description = description;
      task.status = status;
      await task.save();
      res.json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (task) {
      await task.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTasksByUser = async (req, res) => {
  const userId = req.session.userId; // Assurez-vous que le middleware d'authentification stocke l'ID de l'utilisateur dans la session
  try {
    const tasks = await Task.findAll({
      where: {
        Pid_person: userId,
      },
    });
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getTasksByUserId = async (req, res) => {
  const { userId } = req.params; // Récupérer l'ID de l'utilisateur depuis les paramètres de l'URL
  try {
    const tasks = await Task.findAll({
      where: {
        Pid_person: userId,
      },
    });
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createTask, getAllTasks, updateTask, deleteTask, getTaskById, getTasksByUser, getTasksByUserId };
