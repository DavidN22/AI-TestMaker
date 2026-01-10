/**
 * Script to create the flashcard_history table
 * Run with: npx tsx server/scripts/setupFlashcardTable.ts
 */
import dotenv from "dotenv";
import { pool, testDbConnection } from "../db/db.js";
// Load environment variables
dotenv.config();
const createFlashcardHistoryTable = async () => {
    console.log("🚀 Setting up flashcard_history table...\n");
    try {
        // Test connection first
        await testDbConnection();
        // Create the table
        console.log("📝 Creating flashcard_history table...");
        await pool.query(`
      CREATE TABLE IF NOT EXISTS flashcard_history (
        id SERIAL PRIMARY KEY,
        "user" VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        flashcards JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        source_type VARCHAR(50) NOT NULL,
        source_id VARCHAR(255),
        topic VARCHAR(500),
        is_favorite BOOLEAN DEFAULT FALSE
      );
    `);
        console.log("✅ Table created successfully!\n");
        // Create indexes
        console.log("📊 Creating indexes...");
        await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_flashcard_history_user 
      ON flashcard_history("user");
    `);
        console.log("✅ User index created");
        await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_flashcard_history_favorites 
      ON flashcard_history("user", is_favorite) 
      WHERE is_favorite = TRUE;
    `);
        console.log("✅ Favorites index created");
        await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_flashcard_history_recent 
      ON flashcard_history("user", created_at DESC);
    `);
        console.log("✅ Recent index created\n");
        // Verify table structure
        console.log("🔍 Verifying table structure...");
        const result = await pool.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'flashcard_history'
      ORDER BY ordinal_position;
    `);
        console.log("\n📋 Table Columns:");
        console.table(result.rows);
        // Check indexes
        const indexResult = await pool.query(`
      SELECT indexname, indexdef
      FROM pg_indexes
      WHERE tablename = 'flashcard_history';
    `);
        console.log("📋 Indexes:");
        console.table(indexResult.rows);
        console.log("\n✨ Setup complete! The flashcard_history table is ready to use.\n");
    }
    catch (error) {
        console.error("❌ Error setting up flashcard_history table:");
        console.error(error.message);
        process.exit(1);
    }
    finally {
        await pool.end();
    }
};
// Run the setup
createFlashcardHistoryTable();
