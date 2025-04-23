import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import pool from "./config/db.js";
import tasksRoutes from "./routes/tasksRoutes.js";
import errorHandling from "./middlewares/errorHandler.js";
import healthRoutes from "./routes/health.js";

  dotenv.config();
  const app = express();

  // Start the server
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  //middlewares
  app.use(express.json());
  app.use(cors());

  //router part
  app.use("/api", tasksRoutes);
  app.use("/api", healthRoutes);  //health check router

  //error handling meddleware
  app.use(errorHandling);

  
   
 