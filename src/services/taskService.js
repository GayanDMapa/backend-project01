import { v4 as uuidv4 } from 'uuid';
import {
  createTaskService,
  deleteTaskService,
  getAllTasksService,
  getTaskByIdService,
  updateTaskService,
} from '../model/tasksModel.js';

// Create task with user_id
export const createTaskLogic = async (user_id, title, description) => {
  // Optional: Validate inputs here (title required, etc.)
  return await createTaskService(user_id, title, description);
};

// Get all tasks
export const getAllTasksLogic = async () => {
  return await getAllTasksService();
};

// Get single task by ID
export const getTaskByIdLogic = async (taskId) => {
  return await getTaskByIdService(taskId);
};

// Update task by ID
export const updateTaskLogic = async (taskId, title, description, is_completed) => {
  return await updateTaskService(taskId, title, description, is_completed);
};

// Delete task by ID
export const deleteTaskLogic = async (taskId) => {
  return await deleteTaskService(taskId);
};

