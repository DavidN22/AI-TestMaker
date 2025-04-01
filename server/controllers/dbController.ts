import { Request, Response, NextFunction } from "express";
import { pool } from "../db/db.js"; // Ensure your database connection is configured
import { createClient } from "../utils/supabaseServerClient.js";

const dbController = {
  addQuizResult: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        score,
        correctCount,
        wrongCount,
        unansweredCount,
        updatedQuizData,
        testName,
        weakPoints,
        summary,
      } = req.body.resultsWithWeakPoints;
      let user = res.locals.user;
      const query = `
        INSERT INTO devtests (score, "user", correct_count, wrong_count, unanswered_count, title, weak_points, summary, quiz_data)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING test_id;
      `;

      const values = [
        score,
        user,
        correctCount,
        wrongCount,
        unansweredCount,
        testName,
        weakPoints,
        summary,
        JSON.stringify(updatedQuizData),
      ];
      const result = await pool.query(query, values);

      res.status(201).json({
        message: "Quiz result saved successfully",
        quizId: result.rows[0],
      });
    } catch (error) {
      next(error);
    }
  },

  getQuizResults: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let user = res.locals.user;
      const query = `
        SELECT * FROM devtests WHERE "user" = $1 ORDER BY date DESC;
      `;
      const result = await pool.query(query, [user]);
  
      res.json(result.rows);
    } catch (error) {
      next(error);
    }
  },

  deleteAccount: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const supabase = createClient({ req, res });

      await supabase.auth.signOut();
      let userid = res.locals.uid;
      let user = res.locals.user;

      await supabase.auth.admin.deleteUser(userid);
      const deleteQuery = `DELETE FROM devtests WHERE "user" = $1`;
      await pool.query(deleteQuery, [user]);

      res.json({ message: "Account deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
  clearAllTestResults: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let user = res.locals.user;
      const deleteQuery = `DELETE FROM devtests WHERE "user" = $1`;
      await pool.query(deleteQuery, [user]);
  
      res.status(200).json({ message: "All test results cleared successfully." });
    } catch (error) {
      next(error);
    }
  },
  
  deleteSingleTestResult: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { testId } = req.params;
      const user = res.locals.user;
      const deleteQuery = `DELETE FROM devtests WHERE test_id = $1 AND "user" = $2`;
      await pool.query(deleteQuery, [testId, user]);
  
      res.status(200).json({ message: `Test result ${testId} deleted successfully.` });
    } catch (error) {
      next(error);
    }
  },
  
};

export default dbController;
