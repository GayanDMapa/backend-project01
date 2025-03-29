import express from "express";
import { createUser, deleteTask, getAllTasks, getTaskById, updateTask } from "../controllers/taskController.js";

const router = express.Router();

router.post("/task",createUser);
router.get("/task",getAllTasks);
router.get("/task/:id", getTaskById);
router.put("/task/:id", updateTask);
router.delete("/task/:id", deleteTask);


export default router;