import { Request, Response, NextFunction } from "express";
import { pool } from "../db/db.js"; // Ensure your database connection is configured // Ensure your database connection is configured
import { createClient } from "../utils/supabaseServerClient.js";

const dbController = { // Main controller object for handling database-related interactions
  addQuizResult: async (req: Request, res: Response, next: NextFunction) => { // Add user's quiz results to the database
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
        provider,
        difficulty,
      } = req.body.resultsWithWeakPoints;
      let user = res.locals.user;
      const query = `// SQL query to insert new custom test data// SQL query to fetch quiz results in descending order by date// SQL query to insert quiz result data into the database
        INSERT INTO devtests (score, "user", correct_count, wrong_count, provider, difficulty, unanswered_count, title, weak_points, summary, quiz_data)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING test_id;
      `;

      const values = [
        score,
        user,
        correctCount,
        wrongCount,
        provider,
        difficulty,
        unansweredCount,
        testName,
        weakPoints,
        summary,
        JSON.stringify(updatedQuizData),
      ];
      const result = await pool.query(query, values); // Execute SQL query with provided values

      res.status(201).json({
        message: "Quiz result saved successfully",
        quizId: result.rows[0],
      });
    } catch (error) {
      next(error);
    }
  },

  getQuizResults: async (req: Request, res: Response, next: NextFunction) => { // Retrieve all quiz results for the authenticated user
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

  deleteAccount: async (req: Request, res: Response, next: NextFunction) => { // Delete user account and related data
    try {
      const supabase = createClient({ req, res });
  
      await supabase.auth.signOut();
      let userid = res.locals.uid;
      let user = res.locals.user;
  
      await supabase.auth.admin.deleteUser(userid); // Remove user from Supabase authentication
      await pool.query(`DELETE FROM devtests WHERE "user" = $1`, [user]);
      await pool.query(`DELETE FROM customtests WHERE "user" = $1`, [user]);
  
      res.json({ message: "Account deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
  
  clearAllTestResults: async ( // Clear all stored test results for a user
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let user = res.locals.user;
      const deleteQuery = `DELETE FROM devtests WHERE "user" = $1`; // SQL query to delete all user test records
      await pool.query(deleteQuery, [user]);

      res
        .status(200)
        .json({ message: "All test results cleared successfully." });
    } catch (error) {
      next(error);
    }
  },

  deleteSingleTestResult: async ( // Delete a specific test result by test ID
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { testId } = req.params;
      const user = res.locals.user;
      const deleteQuery = `DELETE FROM devtests WHERE test_id = $1 AND "user" = $2`;
      await pool.query(deleteQuery, [testId, user]);

      res
        .status(200)
        .json({ message: `Test result ${testId} deleted successfully.` });
    } catch (error) {
      next(error);
    }
  },

  createCustomTest: async (req: Request, res: Response, next: NextFunction) => { // Create a new custom test in the database
    try {
      const { title, headline, description, difficulty } = req.body;

      let user = res.locals.user;

      const query = `
        INSERT INTO customtests ("user", title, headline, description, difficulty)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id;
      `;

      const values = [user, title, headline, description, difficulty];
      const result = await pool.query(query, values);

      res.status(201).json({
        message: "Custom test created successfully",
        quizId: result.rows[0],
      });
    } catch (error) {
      next(error);
    }
  },

  getCustomTests: async (req: Request, res: Response, next: NextFunction) => { // Fetch all custom tests created by the user
    try {
      let user = res.locals.user;
      const query = `
        SELECT * FROM customtests WHERE "user" = $1 
        ORDER BY created_at ASC;
      `;
      const result = await pool.query(query, [user]);

      res.json(result.rows);
    } catch (error) {
      next(error);
    }
  },

  deleteCustomTest: async (req: Request, res: Response, next: NextFunction) => { // Remove a specific custom test by test ID
    try {
      const { testId } = req.params;
      const user = res.locals.user;
      const deleteQuery = `DELETE FROM customtests WHERE test_id = $1 AND "user" = $2`;
      await pool.query(deleteQuery, [testId, user]);

      res
        .status(200)
        .json({ message: `Custom test ${testId} deleted successfully.` });
    } catch (error) {
      next(error);
    }
  },
  updateCustomTest: async ( // Update details of a specific custom test in the database
    req: Request,

    res: Response,
    next: NextFunction
  ) => {
    try {
      const { testId } = req.params;
      const { title, headline, description, difficulty } = req.body;
      
      let user = res.locals.user;

      const query = `
        UPDATE customtests
        SET title = $1, headline = $2, description = $3, difficulty = $4
        WHERE test_id = $5 AND "user" = $6
      `;

      const values = [title, headline, description, difficulty, testId, user];
      await pool.query(query, values);

      res.status(200).json({
        message: "Custom test updated successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};

export default dbController;
