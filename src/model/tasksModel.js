// services/taskService.js
import pool from "../config/db.js";

// Get all tasks
export const getAllTasksService = async () => {
  const result = await pool.query(`
    SELECT tasks.*, users.name 
    FROM tasks 
    JOIN users ON tasks.user_id = users.id
  `);
  return result.rows;
};

// Get task by ID
export const getTaskByIdService = async (id) => {
  const result = await pool.query(`
    SELECT tasks.*, users.name 
    FROM tasks 
    JOIN users ON tasks.user_id = users.id 
    WHERE tasks.id = $1
  `, [id]);

  if (result.rows.length === 0) {
    throw new Error("Task not found");
  }

  return result.rows[0];
};

// Create task
export const createTaskService = async (user_id, title, description) => {
  const insertResult = await pool.query(`
    INSERT INTO tasks (user_id, title, description, is_completed, created_at, updated_at)
    VALUES ($1, $2, $3, FALSE, NOW(), NOW())
    RETURNING *
  `, [user_id, title, description]);

  const task = insertResult.rows[0];

  const fullTaskResult = await pool.query(`
    SELECT tasks.*, users.name 
    FROM tasks 
    JOIN users ON tasks.user_id = users.id 
    WHERE tasks.id = $1
  `, [task.id]);

  return fullTaskResult.rows[0];
};

// Update task
export const updateTaskService = async (id, title, description, is_completed) => {
  const result = await pool.query(`
    UPDATE tasks 
    SET title = $1, description = $2, is_completed = $3, updated_at = NOW() 
    WHERE id = $4 
    RETURNING *
  `, [title, description, is_completed, id]);

  if (result.rows.length === 0) {
    throw new Error("Task not found or update failed");
  }

  return result.rows[0];
};

// Delete task
export const deleteTaskService = async (id) => {
  const result = await pool.query(`
    DELETE FROM tasks WHERE id = $1 RETURNING *
  `, [id]);

  if (result.rows.length === 0) {
    throw new Error("Task not found or already deleted");
  }

  return result.rows[0];
};
