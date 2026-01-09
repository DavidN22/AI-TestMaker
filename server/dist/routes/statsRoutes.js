import express from "express";
import statController from "../controllers/statController.js";
import { decodeUserMiddleware } from "../middleware/decodeUserMiddleware.js";
const router = express.Router();
// ...existing routes...
// Stats summary route
router.get("/dashboard", decodeUserMiddleware, statController.getDashboardData);
// Admin route to get all users
router.get("/users", decodeUserMiddleware, statController.getAllUsers);
export default router;
