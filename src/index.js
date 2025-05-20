import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js"; // Your DB config, keep if needed
import tasksRoutes from "./routes/tasksRoutes.js";
import healthRoutes from "./routes/health.js";
import authRoutes from "./routes/authRoutes.js";  // Import auth routes
import errorHandling from "./middlewares/errorHandler.js";

dotenv.config();

console.log("JWT_SECRET:", process.env.JWT_SECRET); // ✅ Should print the secret


const app = express();
const PORT = 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Routers: all under "/api"
app.use("/api", tasksRoutes);
app.use("/api", healthRoutes);
app.use("/api", authRoutes);  // Auth routes (like /api/login)

// Error handling middleware
app.use(errorHandling);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
