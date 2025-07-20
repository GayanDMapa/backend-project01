import jwt from "jsonwebtoken";
import { verifyUser } from '../model/authModel.js';

import dotenv from "dotenv";
import {
  registerUser,
  loginUser,
  confirmEmail
} from "../services/authService.js";


dotenv.config();

// Signup user controller
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  try {
    // Register user (registerUser handles hashing, saving, and sending email)
    await registerUser(name, email, password);

    res.status(201).json({
      message: "Signup successful. Please check your email to verify your account.",
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(400).json({ message: err.message });
  }
};


export const verifyEmail = async (req, res) => {
  const { token } = req.params;
  console.log("📦 Received token:", token); // <== add this

  if (!token) {
    return res.status(401).json({ message: 'No token provided. Unauthorized.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    console.log("✅ Decoded token:", decoded); // <== add this
    await verifyUser(decoded.id);

    return res.json({ success: true, message: 'Email verified!' });
  } catch (err) {
    console.error("❌ Token verification error:", err.message); // <== this helps
    return res.status(400).json({ message: 'Invalid or expired token.' });
  }
};




// Login user controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // loginUser checks user, password, and verified status, then returns token and user
    const { user, token } = await loginUser(email, password);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        is_verified: user.is_verified,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(401).json({ message: err.message });
  }
};