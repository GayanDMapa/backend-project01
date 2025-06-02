// src/services/taskService.js

import {
  createTaskService,
  deleteTaskService,
  getAllTasksService,
  getTaskByIdService,
  updateTaskService,
} from '../model/tasksModel.js';

// Business logic layer
export const createTaskLogic = async (user_id, title, description) => {
  // Optional: Add logic like checking if user exists, validation, etc.
  return await createTaskService(user_id, title, description);
};

export const getAllTasksLogic = async () => {
  return await getAllTasksService();
};

export const getTaskByIdLogic = async (taskId) => {
  return await getTaskByIdService(taskId);
};

export const updateTaskLogic = async (taskId, title, description, is_completed) => {
  return await updateTaskService(taskId, title, description, is_completed);
};

export const deleteTaskLogic = async (taskId) => {
  return await deleteTaskService(taskId);
};
