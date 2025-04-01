import { Request, Response, NextFunction } from "express";
import { pool } from "../db/db.js"; // adjust path as needed

export const getTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userEmail = res.locals.user; // assuming email is stored in res.locals.user

    if (!userEmail) {
      return next(new Error("Unauthorized: User email missing"));
    }

    const query = "SELECT tokens FROM users WHERE email = $1";
    const result = await pool.query(query, [userEmail]);

    if (result.rows.length === 0) {
      return next(new Error("User not found"));
    }

    const tokens = result.rows[0].tokens;


    if (tokens === 0) {
      return next(new Error("No tokens available"));
    }

    next();
  } catch (error) {
    console.error("Token middleware error:", error);
    next(error);
  }
};
