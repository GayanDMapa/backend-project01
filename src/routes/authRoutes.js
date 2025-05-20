import express from "express";
import { signupUser, loginUser } from "../controllers/authController.js";


const router = express.Router();

// POST /api/signup
router.post("/signup", signupUser);

// POST /api/login
router.post('/login', loginUser);

export default router;
