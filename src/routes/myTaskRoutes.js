import express from 'express';
import {
  getMyTasks,
  getMyTaskById,
  createMyTask,
  updateMyTask,
  deleteMyTask,
} from '../controllers/myTaskController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// All these routes are protected by JWT
router.use(authenticateToken);

router.get('/mytasks', getMyTasks);
router.get('/mytasks/:id', getMyTaskById);
router.post('/mytasks', createMyTask);
router.put('/mytasks/:id', updateMyTask);
router.delete('/mytasks/:id', deleteMyTask);

export default router;
