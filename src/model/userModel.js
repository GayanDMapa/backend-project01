import pool from "../config/db.js";

export const createUsceerServi = async (name, email, hashedPassword) => {
  try {
    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash, created_at)
       VALUES ($1, $2, $3, NOW())
       RETURNING id, name, email, created_at`,
      [name, email, hashedPassword]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email, password_hash, created_at FROM users WHERE email = $1`,
      [email]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
};
