import express from "express";
import {
  handleOAuthCallback,
  handleLogout,
  handleLogin,
  getCurrentUser,
} from "../controllers/authController.ts";

const router = express.Router();

router.get("/callback", handleOAuthCallback);
router.get("/logout", handleLogout);
router.get("/login", handleLogin);
router.get("/me", getCurrentUser);

export default router;
