// backend/src/services/authService.js
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { TOKEN_SECRET, JWT_EXPIRES_IN } from "../constants.js";

function createToken(user) {
  const payload = { _id: user._id, email: user.email, username: user.username };
  return jwt.sign(payload, TOKEN_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

async function register(username, email, password, rePassword) {
  if (password !== rePassword) throw new Error("Passwords do not match.");
  const existing = await User.findOne({ email });
  if (existing) throw new Error("Email is already registered.");

  const user = await User.create({ username, email, password });
  const token = createToken(user);
  return { token, user };
}

async function login(email, password) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid email or password.");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid email or password.");

  const token = createToken(user);
  return { token, user };
}

export default { register, login };
