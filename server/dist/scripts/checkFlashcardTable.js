/**
 * Script to check if flashcard_history table exists and show its structure
 * Run with: npx tsx server/scripts/checkFlashcardTable.ts
 */
import dotenv from "dotenv";
import { pool, testDbConnection } from "../db/db.js";
// Load environment variables
dotenv.config();
const checkFlashcardTable = async () => {
    console.log("🔍 Checking flashcard_history table...\n");
    try {
        await testDbConnection();
        // Check if table exists
        const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'flashcard_history'
      );
    `);
        const tableExists = tableCheck.rows[0].exists;
        if (!tableExists) {
            console.log("❌ Table 'flashcard_history' does not exist!");
            console.log("\n💡 Run the setup script to create it:");
            console.log("   npx tsx server/scripts/setupFlashcardTable.ts\n");
            process.exit(1);
        }
        console.log("✅ Table 'flashcard_history' exists!\n");
        // Show table structure
        const columns = await pool.query(`
      SELECT 
        column_name,
        data_type,
        is_nullable,
        column_default
      FROM information_schema.columns
      WHERE table_name = 'flashcard_history'
      ORDER BY ordinal_position;
    `);
        console.log("📋 Table Structure:");
        console.table(columns.rows);
        // Show indexes
        const indexes = await pool.query(`
      SELECT indexname, indexdef
      FROM pg_indexes
      WHERE tablename = 'flashcard_history';
    `);
        console.log("\n📊 Indexes:");
        console.table(indexes.rows);
        // Show row count
        const count = await pool.query(`
      SELECT COUNT(*) as total FROM flashcard_history;
    `);
        console.log(`\n📈 Total Records: ${count.rows[0].total}\n`);
        // Show sample data if exists
        if (parseInt(count.rows[0].total) > 0) {
            const sample = await pool.query(`
        SELECT 
          id,
          "user",
          title,
          source_type,
          is_favorite,
          created_at
        FROM flashcard_history
        ORDER BY created_at DESC
        LIMIT 5;
      `);
            console.log("📝 Recent Flashcard Sets (Last 5):");
            console.table(sample.rows);
        }
        console.log("✅ Table is ready to use!\n");
    }
    catch (error) {
        console.error("❌ Error checking table:");
        console.error(error.message);
        process.exit(1);
    }
    finally {
        await pool.end();
    }
};
checkFlashcardTable();
