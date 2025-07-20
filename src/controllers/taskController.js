// src/controllers/taskController.js

import {
  createTaskLogic,
  deleteTaskLogic,
  getAllTasksLogic,
  getTaskByIdLogic,
  updateTaskLogic,
} from '../services/taskService.js';

// Response helper
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

// CREATE
// export const createUser = async (req, res, next) => {
//   const { title, description } = req.body;
//   const user_id = req.user.user_id; // Get it from the decoded token
//   try {
//     const newTask = await createTaskLogic(user_id, title, description);
//     handleResponse(res, 201, 'Task created successfully', newTask);
//   } catch (err) {
//     next(err);
//   }
// };

export const createUser = async (req, res, next) => {
  const { title, description } = req.body;
  const user_id = req.user.id; // ✅ FIXED here

  try {
    const newTask = await createTaskLogic(user_id, title, description);
    handleResponse(res, 201, 'Task created successfully', newTask);
  } catch (err) {
    next(err);
  }
};

// READ ALL
export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await getAllTasksLogic();
    handleResponse(res, 200, 'Tasks fetched successfully', tasks);
  } catch (err) {
    next(err);
  }
};

// READ ONE
export const getTaskById = async (req, res, next) => {
  try {
    const task = await getTaskByIdLogic(req.params.id);
    if (!task) return handleResponse(res, 404, 'Task not found');
    handleResponse(res, 200, 'Task fetched successfully', task);
  } catch (err) {
    next(err);
  }
};

// UPDATE
export const updateTask = async (req, res, next) => {
  const { title, description, is_completed } = req.body;
  const taskId = req.params.id;
  try {
    const updatedTask = await updateTaskLogic(taskId, title, description, is_completed);
    if (!updatedTask) return handleResponse(res, 404, 'Task not found');
    handleResponse(res, 200, 'Task updated successfully', updatedTask);
  } catch (err) {
    next(err);
  }
};

// DELETE
export const deleteTask = async (req, res, next) => {
  try {
    const deletedTask = await deleteTaskLogic(req.params.id);
    if (!deletedTask) return handleResponse(res, 404, 'Task not found');
    handleResponse(res, 200, 'Task deleted successfully', deletedTask);
  } catch (err) {
    next(err);
  }
};
