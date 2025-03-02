import { Request, Response, NextFunction } from "express";
import { pool } from "../db/db.ts"; // Ensure your database connection is configured
import { json } from "stream/consumers";

const dbController = {
  addQuizResult: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        score,
        correctCount,
        wrongCount,
        unansweredCount,
        updatedQuizData, // This remains an array but stored as JSON
        testName,
        weakPoints,
        summary,
        date,
      } = req.body.resultsWithWeakPoints;
      // Insert into database, storing updatedQuizData as JSONB
      const query = `
        INSERT INTO devtests (score, correct_count, wrong_count, unanswered_count, title, weak_points, summary, quiz_data, date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id;
      `;

      const values = [
        score,
        correctCount,
        wrongCount,
        unansweredCount,
        testName,
        weakPoints,
        summary,
        JSON.stringify(updatedQuizData), // Convert array to JSON string
        date,
      ];
      const result = await pool.query(query, values);

      res.status(201).json({ message: "Quiz result saved successfully", quizId: result.rows[0].id });
    } catch (error) {
      console.error("Error inserting quiz data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default dbController;
