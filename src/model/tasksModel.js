import pool from "../config/db.js";

//Get all tasks
export const getAllTasksService = async() => {
    const result = await pool.query("SELECT * FROM tasks");
    return result.rows;
};

//get task by id
export const getTaskByIdService = async(id) => {
    const result = await pool.query("SELECT * FROM tasks WHERE id=$1",[id]);
    return result.rows[0];
};

//create task
export const createTaskService = async (user_id, title, description) => {
    const result = await pool.query(
        `INSERT INTO tasks (user_id, title, description, is_completed, created_at, updated_at) VALUES ($1, $2, $3, FALSE, NOW(), NOW()) RETURNING *`, 
        [user_id, title, description]
    );
    return result.rows[0];
};

export const updateTaskService = async (id, title, description, is_completed) => {
    const result = await pool.query(
        `UPDATE tasks 
         SET title = $1, description = $2, is_completed = $3, updated_at = NOW() 
         WHERE id = $4 
         RETURNING *`, 
        [title, description, is_completed, id]
    );
    return result.rows[0]; // Return the updated task
};

// 🔹 Delete a Task
// export const deleteTaskService = async (id) => {
//     const result = await pool.query(`DELETE FROM tasks WHERE id = $1 RETURNING *`,
//         [id]);
//     return result.rows[0];  
// };

export const deleteTaskService = async (id) => {
    const result = await pool.query(`DELETE FROM tasks WHERE id = $1 RETURNING *`, [id]);
    return result.rows[0];  
};
