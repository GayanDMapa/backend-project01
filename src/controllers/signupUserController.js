import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail } from "../services/userService.js";
import { signupSchema } from "../validations/userValidation.js";

export const signupUser = async (req, res, next) => {
  console.log("Received signup data:", req.body);

  const { error } = signupSchema.validate(req.body);
  if (error) {
    console.log("Validation error:", error.details[0].message);
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = await createUser(name, email, password);

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
      token,
    });
  } catch (err) {
    next(err);
  }
};
