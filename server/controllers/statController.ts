import { Request, Response, NextFunction } from "express";
import { pool } from "../db/db.js";

const statController = {
getDashboardData: async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;

const query = `
  SELECT 
    TO_CHAR(date, 'YYYY-MM-DD') AS date,
    REPLACE(score, '%', '')::FLOAT AS score,
    provider,
    difficulty,
    weak_points,
    title
  FROM devtests
  WHERE "user" = $1
  ORDER BY date DESC
  LIMIT 100;
`;


    const { rows } = await pool.query(query, [user]);

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
}


};

export default statController;
