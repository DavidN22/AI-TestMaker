import pkg from "pg";

const { Pool } = pkg;

// Configure pg to parse timestamps as UTC
// This prevents the driver from converting timestamps to local timezone
pkg.types.setTypeParser(1114, (str) => str); // timestamp without timezone
pkg.types.setTypeParser(1184, (str) => str); // timestamp with timezone

const pool = new Pool({
    connectionString: process.env.DB_URI,
});

// Test the connection immediately
const testDbConnection = async () => {
    try {
        const result = await pool.query("SELECT NOW()");
        console.log(`✅ PostgreSQL connected successfully at: ${result.rows[0].now}`);
    } catch (err: any) {
        console.error("❌ Error connecting to PostgreSQL:" + err.message);
        process.exit(1); 
    }
};


export { pool, testDbConnection };
