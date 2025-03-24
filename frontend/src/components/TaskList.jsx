import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Fade,
  Slide,
  Chip,
  Tooltip,
  CircularProgress,
  Alert,
  Snackbar,
  useTheme,
  alpha,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import TaskIcon from '@mui/icons-material/Task';
import axios from 'axios';

const API_URL = 'http://localhost:5000/tasks';

const TaskList = () => {
  const theme = useTheme();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
      showSnackbar('Error fetching tasks', 'error');
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    try {
      const response = await axios.post(API_URL, newTask);
      setTasks([...tasks, response.data]);
      setNewTask({ title: '', description: '' });
      showSnackbar('Task added successfully');
    } catch (error) {
      console.error('Error adding task:', error);
      showSnackbar('Error adding task', 'error');
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await axios.put(`${API_URL}/${task.id}`, {
        ...task,
        completed: !task.completed,
      });
      setTasks(tasks.map((t) =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
      ));
      showSnackbar(`Task ${task.completed ? 'uncompleted' : 'completed'}`);
    } catch (error) {
      console.error('Error updating task:', error);
      showSnackbar('Error updating task', 'error');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/${taskId}`);
      setTasks(tasks.filter((task) => task.id !== taskId));
      showSnackbar('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
      showSnackbar('Error deleting task', 'error');
    }
  };

  const handleEditTask = async (task) => {
    try {
      const response = await axios.put(`${API_URL}/${task.id}`, task);
      setTasks(tasks.map((t) => (t.id === task.id ? response.data : t)));
      setEditingTask(null);
      showSnackbar('Task updated successfully');
    } catch (error) {
      console.error('Error updating task:', error);
      showSnackbar('Error updating task', 'error');
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Fade in timeout={500}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          background: alpha(theme.palette.background.paper, 0.9),
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        }}
      >
        <Box display="flex" alignItems="center" mb={4}>
          <TaskIcon sx={{ fontSize: 40, mr: 2, color: theme.palette.primary.main }} />
          <Typography variant="h4" component="h1" sx={{ mb: 0 }}>
            Task Manager
          </Typography>
        </Box>

        <Paper
          component="form"
          onSubmit={handleAddTask}
          sx={{
            p: 2,
            mb: 3,
            background: alpha(theme.palette.background.paper, 0.5),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          }}
        >
          <TextField
            fullWidth
            label="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            sx={{ mb: 2 }}
            variant="outlined"
            InputProps={{
              startAdornment: <AddIcon sx={{ mr: 1, color: theme.palette.primary.main }} />,
            }}
          />
          <TextField
            fullWidth
            label="Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            sx={{ mb: 2 }}
            variant="outlined"
            multiline
            rows={2}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!newTask.title.trim()}
            startIcon={<AddIcon />}
            sx={{ borderRadius: 2 }}
          >
            Add Task
          </Button>
        </Paper>

        <List>
          {tasks.map((task, index) => (
            <Slide
              direction="right"
              in
              timeout={300}
              style={{ transitionDelay: `${index * 50}ms` }}
              key={task.id}
            >
              <ListItem
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  background: alpha(theme.palette.background.paper, 0.5),
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  '&:hover': {
                    background: alpha(theme.palette.primary.main, 0.05),
                    transform: 'translateX(5px)',
                    transition: 'all 0.2s ease-in-out',
                  },
                }}
              >
                <Checkbox
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task)}
                  color="primary"
                  sx={{
                    '&.Mui-checked': {
                      color: theme.palette.success.main,
                    },
                  }}
                />
                {editingTask?.id === task.id ? (
                  <Box sx={{ flex: 1, display: 'flex', gap: 1 }}>
                    <TextField
                      fullWidth
                      value={editingTask.title}
                      onChange={(e) =>
                        setEditingTask({ ...editingTask, title: e.target.value })
                      }
                      size="small"
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      value={editingTask.description}
                      onChange={(e) =>
                        setEditingTask({ ...editingTask, description: e.target.value })
                      }
                      size="small"
                      variant="outlined"
                    />
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleEditTask(editingTask)}
                      color="primary"
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => setEditingTask(null)}
                    >
                      Cancel
                    </Button>
                  </Box>
                ) : (
                  <>
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle1"
                          sx={{
                            textDecoration: task.completed ? 'line-through' : 'none',
                            color: task.completed ? 'text.secondary' : 'text.primary',
                          }}
                        >
                          {task.title}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 0.5 }}
                        >
                          {task.description}
                        </Typography>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Tooltip title="Edit Task">
                        <IconButton
                          edge="end"
                          onClick={() => setEditingTask(task)}
                          sx={{ mr: 1 }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Task">
                        <IconButton
                          edge="end"
                          onClick={() => handleDeleteTask(task.id)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </ListItemSecondaryAction>
                  </>
                )}
              </ListItem>
            </Slide>
          ))}
        </List>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Fade>
  );
};

export default TaskList; 