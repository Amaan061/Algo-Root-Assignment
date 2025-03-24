const Task = require('../models/Task');

const taskController = {
  // Get all tasks
  getAllTasks: async (req, res) => {
    try {
      const tasks = await Task.getAll();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create a new task
  createTask: async (req, res) => {
    try {
      const { title, description } = req.body;
      
      if (!title) {
        return res.status(400).json({ error: 'Title is required' });
      }

      const task = await Task.create(title, description);
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a task
  updateTask: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, completed } = req.body;

      if (!title) {
        return res.status(400).json({ error: 'Title is required' });
      }

      const task = await Task.update(id, { title, description, completed });
      res.json(task);
    } catch (error) {
      if (error.message === 'Task not found') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },

  // Delete a task
  deleteTask: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Task.delete(id);
      res.json(result);
    } catch (error) {
      if (error.message === 'Task not found') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },

  // Get a single task by ID
  getTaskById: async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.getById(id);
      res.json(task);
    } catch (error) {
      if (error.message === 'Task not found') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
};

module.exports = taskController; 