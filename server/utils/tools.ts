import { tool } from "@openai/agents";
import { z } from "zod";
import { pool } from "../db/db.js";

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
  description: "Fetch the latest 100 test records for the current user from the devtests table.",
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
