import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUserService, getUserByEmail } from "../models/userModel.js";

export const signupUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUserService(name, email, hashedPassword);

    res.status(201).json({ message: "User registered", user: newUser });
  } catch (err) {
    next(err);
  }
};
