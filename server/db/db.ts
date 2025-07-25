import pkg from "pg";

const { Pool } = pkg;

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
