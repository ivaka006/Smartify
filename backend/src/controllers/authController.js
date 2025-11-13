import { Router } from "express";
import jwt from "jsonwebtoken";                    // ← add
import authService from "../services/authService.js";
import { AUTH_COOKIE_NAME, TOKEN_SECRET } from "../constants.js"; // ← fix path/import
import { getErrorMessage } from "../utils/errorUtils.js";
import User from "../models/User.js";              // ← add

const authController = Router();

// POST /api/auth/register
authController.post("/register", async (req, res) => {
  try {
    const { username, email, password, rePassword } = req.body;
    const { token, user } = await authService.register(username, email, password, rePassword);
    res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true, sameSite: "lax" });
    res.status(201).json({ user: { _id: user._id, email: user.email, username: user.username } });
  } catch (err) {
    res.status(400).json({ error: getErrorMessage(err) });
  }
});

// POST /api/auth/login
authController.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.login(email, password);
    res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true, sameSite: "lax" });
    res.json({ user: { _id: user._id, email: user.email, username: user.username } });
  } catch (err) {
    res.status(400).json({ error: getErrorMessage(err) });
  }
});

// POST /api/auth/logout
authController.post("/logout", (req, res) => {
  res.clearCookie(AUTH_COOKIE_NAME);
  res.json({ ok: true });
});

// GET /api/auth/me
authController.get("/me", async (req, res) => {
  try {
    const token = req.cookies[AUTH_COOKIE_NAME];
    if (!token) return res.status(401).json({ error: "Not logged in" });

    const decoded = jwt.verify(token, TOKEN_SECRET);
    const user = await User.findById(decoded._id).select("username email");

    res.json({ user });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});

export default authController;
