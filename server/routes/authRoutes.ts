import express from "express";
import {
  handleOAuthCallback,
  handleLogout,
  handleLogin,
  getCurrentUser,
  getUserToken,
} from "../controllers/authController.js";
import { decodeUserMiddleware } from "../middleware/decodeUserMiddleware.js";
import { supabaseClientMiddleware } from "../middleware/supabaseClientMiddleware.js";

const router = express.Router();

router.get("/callback",supabaseClientMiddleware, handleOAuthCallback);
router.get("/logout",supabaseClientMiddleware, handleLogout);
router.get("/login", supabaseClientMiddleware,handleLogin);
router.get("/me", supabaseClientMiddleware,getCurrentUser);
router.get("/tokens", decodeUserMiddleware, getUserToken)


export default router;
