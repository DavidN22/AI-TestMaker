import express from "express";
import {
  handleOAuthCallback,
  handleLogout,
  handleLogin,
  getCurrentUser,
  getUserToken,
} from "../controllers/authController.ts";
import { decodeUserMiddleware } from "../middleware/decodeUserMiddleware.ts";

const router = express.Router();

router.get("/callback", handleOAuthCallback);
router.get("/logout", handleLogout);
router.get("/login", handleLogin);
router.get("/tokens", decodeUserMiddleware, getUserToken)
router.get("/me", getCurrentUser);

export default router;
