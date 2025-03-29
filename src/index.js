import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import pool from "./config/db.js";
import tasksRoutes from "./routes/tasksRoutes.js";
import errorHandling from "./middlewares/errorHandler.js";

dotenv.config();
  const app = express();

//   // Health-check route (just checking if our helper is awake)
//   app.get("/api/health", (req, res) => {
//     res.send("OK");
//   });

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

  //error handling meddleware
  app.use(errorHandling);

  //simple testing postgresql
  app.get("/",async (req, res) => {
    try {
    const result = await pool.query("SELECT current_database()");
    res.send(`The database name is: ${result.rows[0].current_database}`);
    } catch (err) {
  console.error(err);
  res.status(500).send("Database query failed");
}
  });