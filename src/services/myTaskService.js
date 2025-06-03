import pool from '../config/db.js';

// GET all tasks by user ID
export const getMyTasksLogic = async (userId) => {
  const result = await pool.query('SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
  return result.rows;
};

// GET a specific task by user ID and task ID
export const getMyTaskByIdLogic = async (userId, taskId) => {
  const result = await pool.query('SELECT * FROM tasks WHERE id = $1 AND user_id = $2', [taskId, userId]);
  return result.rows[0];
};

// CREATE task for a user
export const createMyTaskLogic = async (userId, title, description) => {
  const result = await pool.query(
    'INSERT INTO tasks (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
    [userId, title, description]
  );
  return result.rows[0];
};

// UPDATE task (if belongs to user)
export const updateMyTaskLogic = async (userId, taskId, title, description, is_completed) => {
  const result = await pool.query(
    `UPDATE tasks SET title = $1, description = $2, is_completed = $3 
     WHERE id = $4 AND user_id = $5 RETURNING *`,
    [title, description, is_completed, taskId, userId]
  );
  return result.rows[0];
};

// DELETE task (if belongs to user)
export const deleteMyTaskLogic = async (userId, taskId) => {
  const result = await pool.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *', [taskId, userId]);
  return result.rows[0];
};
