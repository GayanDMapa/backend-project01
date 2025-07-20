import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import transporter from "../config/mail.js";
import {
  saveUser,
  findUserByEmail,
  verifyUser
} from "../model/authModel.js";

// Utility function to generate a secure random token
export const generateToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Function to create a verification token object with expiry
export const createVerificationToken = () => {
  return {
    token: crypto.randomBytes(32).toString('hex'),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  };
};

// Register new user and send verification email
export const registerUser = async (name, email, password) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await saveUser(name, email, hashedPassword); // is_verified = false

  const emailToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const url = `${process.env.CLIENT_URL}/verify-email/${emailToken}`;

  await transporter.sendMail({
    to: user.email,
    subject: "Confirm your email",
    html: `Click to verify: <a href="${url}">${url}</a>`,
  });

  return user;
};

// Login user and return JWT
export const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("User not found");

  if (!user.is_verified) throw new Error("Please verify your email first");

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw new Error("Invalid password");

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return { user, token };
};


// Confirm email by verifying token and updating user status
// This function assumes you have a 'verifyUser' method that updates the user's is_verified status

export const confirmEmail = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded token:", decoded);
    const userId = decoded.id;

    const result = await verifyUser(userId);
    console.log("✅ User verified:", result);
  } catch (err) {
    console.error("❌ Email verification error:", err.message);
    throw new Error("Invalid or expired token");
  }
};

