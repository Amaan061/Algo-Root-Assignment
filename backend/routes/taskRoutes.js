const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// GET /tasks - Get all tasks
router.get('/', taskController.getAllTasks);

// POST /tasks - Create a new task
router.post('/', taskController.createTask);

// GET /tasks/:id - Get a single task
router.get('/:id', taskController.getTaskById);

// PUT /tasks/:id - Update a task
router.put('/:id', taskController.updateTask);

// DELETE /tasks/:id - Delete a task
router.delete('/:id', taskController.deleteTask);

module.exports = router; 