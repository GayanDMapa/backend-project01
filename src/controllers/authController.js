import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

// Signup user controller
export const signupUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  try {
    console.log("Signup request body:", req.body);

    // 1. Check if user already exists
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    // 2. Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 3. Insert new user into database
    const result = await pool.query(
      "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashedPassword]
    );

    const newUser = result.rows[0];

    // 4. Create JWT token
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // 5. Send response
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: newUser,
    });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};

// Login user controller
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    console.log("Login request body:", req.body);

    // 1. Find user by email
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // 3. Create JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // 4. Send response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || null,
      },
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};
