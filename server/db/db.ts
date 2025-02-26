import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg; // Fix import issue

const pool = new Pool({
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "starwars2",
});

// Test the connection immediately
const testDbConnection = async () => {
    try {
        const result = await pool.query("SELECT NOW()");
        console.log(`✅ PostgreSQL connected successfully at: ${result.rows[0].now}`);
    } catch (err) {
        console.error("❌ Error connecting to PostgreSQL:");
        process.exit(1); // Optional: Exit only if needed
    }
};


export { pool, testDbConnection };
