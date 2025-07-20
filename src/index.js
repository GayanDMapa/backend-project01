// src/index.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

// Import DB connection (optional but good to verify)
import pool from "./config/db.js";

// Import route files
import tasksRoutes from "./routes/tasksRoutes.js";
import healthRoutes from "./routes/health.js";
import authRoutes from "./routes/authRoutes.js";        // Signup/Login routes
import myTaskRoutes from "./routes/myTaskRoutes.js";    // Authenticated user task routes

// Import error handler middleware
import errorHandling from "./middlewares/errorHandler.js";

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Log secret for debugging (you can remove later)
console.log("JWT_SECRET:", process.env.JWT_SECRET);

// Middleware setup
app.use(cors());           // Allow cross-origin requests
app.use(express.json());   // Parse JSON request bodies

// API Routes (prefix all with /api)
app.use("/api", tasksRoutes);
app.use("/api", healthRoutes);
app.use("/api", authRoutes);
app.use("/api", myTaskRoutes);  // CRUD with JWT

// Error handler middleware (should be last)
app.use(errorHandling);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
