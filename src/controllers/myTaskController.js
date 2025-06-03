import {
  getMyTasksLogic,
  getMyTaskByIdLogic,
  createMyTaskLogic,
  updateMyTaskLogic,
  deleteMyTaskLogic,
} from '../services/myTaskService.js';

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({ status, message, data });
};

// GET /mytasks
export const getMyTasks = async (req, res, next) => {
  const userId = req.user.user_id;
  try {
    const tasks = await getMyTasksLogic(userId);
    handleResponse(res, 200, 'My tasks fetched successfully', tasks);
  } catch (err) {
    next(err);
  }
};

// GET /mytasks/:id
export const getMyTaskById = async (req, res, next) => {
  const userId = req.user.user_id;
  const taskId = req.params.id;
  try {
    const task = await getMyTaskByIdLogic(userId, taskId);
    if (!task) return handleResponse(res, 404, 'Task not found');
    handleResponse(res, 200, 'My task fetched successfully', task);
  } catch (err) {
    next(err);
  }
};

// POST /mytasks
export const createMyTask = async (req, res, next) => {
  const userId = req.user.user_id;
  const { title, description } = req.body;
  try {
    const newTask = await createMyTaskLogic(userId, title, description);
    handleResponse(res, 201, 'My task created successfully', newTask);
  } catch (err) {
    next(err);
  }
};

// PUT /mytasks/:id
export const updateMyTask = async (req, res, next) => {
  const userId = req.user.user_id;
  const taskId = req.params.id;
  const { title, description, is_completed } = req.body;
  try {
    const updated = await updateMyTaskLogic(userId, taskId, title, description, is_completed);
    if (!updated) return handleResponse(res, 404, 'Task not found or not yours');
    handleResponse(res, 200, 'My task updated successfully', updated);
  } catch (err) {
    next(err);
  }
};

// DELETE /mytasks/:id
export const deleteMyTask = async (req, res, next) => {
  const userId = req.user.user_id;
  const taskId = req.params.id;
  try {
    const deleted = await deleteMyTaskLogic(userId, taskId);
    if (!deleted) return handleResponse(res, 404, 'Task not found or not yours');
    handleResponse(res, 200, 'My task deleted successfully', deleted);
  } catch (err) {
    next(err);
  }
};
