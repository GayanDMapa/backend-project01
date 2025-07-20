import pool from "../config/db.js";

// Save user to DB without is_verified
export const saveUser = async (name, email, hashedPassword) => {
  const result = await pool.query(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3) RETURNING id, name, email, created_at`,
    [name, email, hashedPassword]
  );
  return result.rows[0];
};

// Find user by email
export const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
};

// Find user by ID
export const findUserById = async (id) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};
// Verify user by updating is_verified status
// This function assumes you have a 'verifyUser' method that updates the user's is_verified status

export const verifyUser = async (id) => {
  const result = await pool.query(
    "UPDATE users SET is_verified = true WHERE id = $1 RETURNING *",
    [id]
  );

  if (result.rowCount === 0) {
    throw new Error("User not found");
  }

  return result.rows[0];
};


