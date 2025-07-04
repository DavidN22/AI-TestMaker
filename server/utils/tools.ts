import { tool } from "@openai/agents";
import { z } from "zod";
import { pool } from "../db/db.js";
import {teskroInfo } from "../utils/faq.js";

// 1. Safe SELECT query tool
export const customSelectTool = tool({
  name: "custom_select_query",
  description:
    "Run a safe, read-only SQL SELECT query on the devtests table for the current user.",
  parameters: z.object({
    query: z
      .string()
      .min(1)
      .describe(
        "A SQL SELECT query scoped to the user. Must include a WHERE clause using userId."
      ),
  }),
  async execute({ query }) {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed.startsWith("select")) {
      return "Only SELECT queries are allowed.";
    }

    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (err: any) {
      console.error("SQL Execution Error:", err);
      return `Query error: ${err.message}`;
    }
  },
});

// 2. Get table schema
export const getDevtestsSchema = tool({
  name: "get_devtests_schema",
  description: "Returns the structure and column names of the devtests table.",
  parameters: z.object({}),
  async execute() {
    return `
      devtests table columns:
      - title (varchar)
      - score (varchar)
      - correct_count (integer)
      - wrong_count (integer)
      - unanswered_count (integer)
      - weak_points (text)
      - quiz_data (json)
      - summary (text)
      - date (timestamp with time zone)
      - user (varchar)
      - id (bigint, primary key)
      - test_id (uuid)
      - provider (varchar) (e.g., "AWS or Some other title" or "Custom")
      - difficulty (varchar)
    `;
  },
});

// 3. Fallback tool
export const getLast100TestsTool = tool({
  name: "get_last_100_tests",
  description: "Fallback that fetches the latest 100 test records for the current user from the devtests table.",
  parameters: z.object({
    userId: z.string().describe("The user ID (email) to fetch test results for."),
  }),
  async execute({ userId }) {
    try {
      const result = await pool.query(
        `
        SELECT date, score, provider, difficulty, weak_points, title
        FROM devtests
        WHERE "user" = $1
        ORDER BY date DESC
        LIMIT 100
      `,
        [userId]
      );
      return result.rows;
    } catch (err: any) {
      console.error("Fallback Query Error:", err);
      return `Failed to fetch last 100 tests: ${err.message}`;
    }
  },
});

export const faqTool = tool({
  name: "faq_tool",
  description: "Returns a list of statements that explain what Teskro is and what it can do.",
  parameters: z.object({
    question: z.string().describe("Any question — will be ignored. This tool always returns the Teskro info."),
  }),
  async execute(_) {
    return teskroInfo;
  },
});

export const createCustomTestTool = tool({
  name: "create_custom_test",
  description: "Creates a new custom test for the user with a title and description. Optionally includes headline and difficulty.",
 parameters: z.object({
  user: z.string().describe("The user's email"),
  title: z.string().min(1).describe("The name of the test"),
  description: z.string().min(1).describe("A short description of the test"),
  headline: z.string().nullable().default(null).describe("Short headline for the test (optional; defaults to title)"),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]).default("Intermediate").describe("Difficulty level (defaults to Intermediate)"),
}),

  async execute({ user, title, description, headline, difficulty }) {
    const resolvedHeadline = headline || title;
    const resolvedDifficulty = difficulty || "Intermediate";

    try {
      const result = await pool.query(
        `
          INSERT INTO customtests ("user", title, headline, description, difficulty)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING test_id, created_at
        `,
        [user, title, resolvedHeadline, description, resolvedDifficulty]
      );
      return {
        message: `✅ Custom test "${title}" created successfully!`,
        test_id: result.rows[0].test_id,
        created_at: result.rows[0].created_at,
      };
    } catch (err: any) {
      console.error("Create Custom Test Error:", err);
      return `❌ Failed to create test: ${err.message}`;
    }
  },
});

// 4. Quiz select tool
export const getQuizDataById = tool({
  name: "get_quiz_data_by_id",
  description: `Returns the quiz_data for a specific test using userId, title, and test_id. If test_id is null, returns the most recent matching test.`,
  parameters: z.object({
    userId: z.string().describe("The user's email"),
    title: z.string().describe("The title of the quiz"),
    test_id: z.string().nullable().describe("The ID of the test. Pass null to get the most recent test."),
  }),
  async execute({ userId, title, test_id }) {
    try {
      let query: string;
      let values: any[];

      if (test_id) {
        query = `
          SELECT quiz_data
          FROM devtests
          WHERE "user" = $1 AND title = $2 AND test_id = $3
          LIMIT 1
        `;
        values = [userId, title, test_id];
      } else {
        query = `
          SELECT quiz_data
          FROM devtests
          WHERE "user" = $1 AND title = $2
          ORDER BY date DESC
          LIMIT 1
        `;
        values = [userId, title];
      }

      const result = await pool.query(query, values);

      if (result.rows.length === 0) {
        return `❌ No quiz found for title "${title}"${test_id ? ` with ID "${test_id}"` : ""}.`;
      }

      return result.rows[0].quiz_data;
    } catch (err: any) {
      console.error("Quiz Data Fetch Error:", err);
      return `Query error: ${err.message}`;
    }
  },
});



