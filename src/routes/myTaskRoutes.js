import express from 'express';
import {
  getMyTasks,
  getMyTaskById,
  createMyTask,
  updateMyTask,
  deleteMyTask,
} from '../controllers/myTaskController.js';

import authenticateToken from '../middlewares/authMiddleware.js';

const router = express.Router();

// All routes here require authentication
router.use(authenticateToken);

// MyTasks routes
router.get('/mytasks', authenticateToken, getMyTasks);
router.get('/mytasks/:id', authenticateToken, getMyTaskById);
router.post('/mytasks', authenticateToken, createMyTask);
router.put('/mytasks/:id', authenticateToken, updateMyTask);
router.delete('/mytasks/:id', authenticateToken, deleteMyTask);

export default router;
