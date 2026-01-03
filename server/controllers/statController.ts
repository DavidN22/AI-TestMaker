import { Request, Response, NextFunction } from "express";
import { pool } from "../db/db.js";

const ADMIN_EMAIL = "naymondavid@gmail.com";

const statController = {
getDashboardData: async (req: Request, res: Response, next: NextFunction) => {
  try {
    const currentUser = res.locals.user;
    const requestedUserId = req.query.userId as string | undefined;
    
    // Determine which user's stats to fetch
    let targetUser = currentUser;
    
    // If requesting another user's stats, verify admin access
    if (requestedUserId && requestedUserId !== currentUser) {
      if (currentUser !== ADMIN_EMAIL) {
        return res.status(403).json({ error: "Unauthorized: Admin access required" });
      }
      targetUser = requestedUserId;
    }
    
const query = `
  SELECT 
  date,
  REPLACE(score, '%', '')::FLOAT AS score,
  provider,
  difficulty,
  weak_points,
  title
FROM devtests
WHERE "user" = $1
ORDER BY date DESC
LIMIT 100`;


    const { rows } = await pool.query(query, [targetUser]);

    const total_tests = rows.length;
    const avg_score =
      rows.reduce((sum, r) => sum + r.score, 0) / (rows.length || 1);
    const last_test_date = rows.length > 0 ? rows[0].date : null;
    res.json({
      meta: {
        total_tests,
        avg_score: Number(avg_score.toFixed(2)),
        last_test_date,
      },
      tests: rows,
    });
  } catch (error) {
    next(error);
  }
},

getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
  try {
    const currentUser = res.locals.user;
    
    // Only admin can fetch all users
    if (currentUser !== ADMIN_EMAIL) {
      return res.status(403).json({ error: "Unauthorized: Admin access required" });
    }
    
    const query = `
      SELECT DISTINCT "user" as email
      FROM devtests
      ORDER BY "user"
    `;
    
    const { rows } = await pool.query(query);
    res.json({ users: rows });
  } catch (error) {
    next(error);
  }
}


};

export default statController;
