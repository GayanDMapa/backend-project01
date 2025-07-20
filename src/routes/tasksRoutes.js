import express from 'express';
import {
  createUser,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';
import  authenticateToken from '../middlewares/authMiddleware.js';

const router = express.Router();

// Task routes (all protected by authentication middleware)
router.post('/tasks', authenticateToken, createUser);
router.get('/tasks', authenticateToken, getAllTasks);
router.get('/tasks/:id', authenticateToken, getTaskById);
router.put('/tasks/:id', authenticateToken, updateTask);
router.delete('/tasks/:id', authenticateToken, deleteTask);

export default router;
