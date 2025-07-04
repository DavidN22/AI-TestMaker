import { Resend } from "resend";
import { pool } from "../db/db.js";
import dotenv from "dotenv";
import * as readline from "readline";
dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);
const CLIENT_URL = "https://teskro.com";
// Capitalize each word in the name
function formatName(name) {
    return name
        .split(" ")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(" ");
}
/*
 * ═══════════════════════════════════════════════════════════════════════════════
 *                           ANNOUNCEMENT CONFIGURATION
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Update the announcement content below, then run the script to send emails
 * to all users in your database.
 *
 * Usage: npm run announcement (add this to your package.json scripts)
 * Or: npx tsx server/scripts/sendAnnouncement.ts
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */
const ANNOUNCEMENT_CONFIG = {
    subject: "🤖 Introducing Teskro Assistant: Your New AI Study Companion",
    // You can use {{name}} placeholder which will be replaced with the user's formatted name
    htmlContent: `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; background-color: #f4f4f7; padding: 40px 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 6px 18px rgba(0,0,0,0.05);">
        <h1 style="font-size: 26px; margin-bottom: 12px;">Hi {{name}}, meet your new AI study buddy! 🤖</h1>
        
        <p style="font-size: 16px; line-height: 1.6;">
          I'm thrilled to introduce <strong>Teskro Assistant</strong> – an intelligent chatbot that's now live on your dashboard to supercharge your exam preparation experience!
        </p>
        
        <h3 style="color: #3b82f6; font-size: 18px; margin: 24px 0 16px 0;">What can Teskro Assistant do for you? ✨</h3>
        
        <ul style="font-size: 16px; line-height: 1.8; padding-left: 20px; margin-bottom: 24px;">
          <li><strong>📊 Analyze Your Performance</strong> – Get insights into your test scores, weak points, and progress trends</li>
          <li><strong>🎯 Create Custom Tests</strong> – Generate personalized tests through simple conversation, without leaving the chat</li>
          <li><strong>❓ Answer Questions</strong> – Get help with Teskro features, navigation, and study strategies</li>
          <li><strong>📈 Track Your Journey</strong> – Review your test history and identify areas for improvement</li>
        </ul>
        
        <p style="font-size: 16px; line-height: 1.6;">
          Whether you're studying for AWS, Azure, GCP, CompTIA, or Linux Foundation certifications, Teskro Assistant is here to guide you every step of the way. Just look for the chat bubble in the bottom-right corner of your screen!
        </p>
        
        <div style="margin: 30px 0;">
          <a href="${CLIENT_URL}/home" style="display: inline-block; padding: 14px 28px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
            Try Teskro Assistant Now
          </a>
        </div>
        
        <p style="font-size: 14px; color: #666;">
          Have feedback about the new assistant or any other questions? I'd love to hear from you at <a href="mailto:naymondavid@gmail.com">naymondavid@gmail.com</a>.
        </p>
        
        <p style="font-size: 14px; color: #666; margin-top: 40px;">
          Happy studying with your new AI companion!  
          <br>– David from Teskro
        </p>
      </div>
    </div>
  `,
    // Optional: Add a delay between emails to avoid rate limiting (in milliseconds)
    delayBetweenEmails: 100,
    // Optional: Send to a subset of users for testing (set to null to send to all users)
    testEmails: [
        {
            email: "naymondavid@gmail.com",
            name: "david naymon",
        },
    ],
};
async function getAllUsers() {
    try {
        const query = 'SELECT email, name FROM "users" ORDER BY email LIMIT 3';
        const result = await pool.query(query);
        return result.rows;
    }
    catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}
async function sendAnnouncementEmail(email, name) {
    try {
        const formattedName = name ? formatName(name) : "there";
        const personalizedHtml = ANNOUNCEMENT_CONFIG.htmlContent.replace(/{{name}}/g, formattedName);
        await resend.emails.send({
            from: "Teskro <welcome@teskro.com>",
            to: email,
            subject: ANNOUNCEMENT_CONFIG.subject,
            html: personalizedHtml,
        });
        console.log(`✅ Email sent to ${email} (${formattedName})`);
        return true;
    }
    catch (error) {
        console.error(`❌ Failed to send email to ${email}:`, error);
        return false;
    }
}
async function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
async function getUserConfirmation() {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('Do you want to proceed with sending emails? (yes/no): ', (answer) => {
            rl.close();
            resolve(answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y');
        });
    });
}
async function sendAnnouncementToAllUsers() {
    console.log("🚀 Starting announcement email campaign...\n");
    try {
        // Get users list
        const users = await getAllUsers();
        if (users.length === 0) {
            console.log("No users found to send emails to.");
            return;
        }
        console.log(`📧 Found ${users.length} users to send emails to\n`);
        // Show first 10 users as preview
        console.log("👥 First 10 users who will receive emails:");
        console.log("═".repeat(60));
        const previewUsers = users.slice(0, 10);
        previewUsers.forEach((user, index) => {
            console.log(`${index + 1}. ${user.name} (${user.email})`);
        });
        if (users.length > 10) {
            console.log(`... and ${users.length - 10} more users`);
        }
        console.log("═".repeat(60));
        console.log(`\nSubject: ${ANNOUNCEMENT_CONFIG.subject}\n`);
        // Get user confirmation
        const shouldProceed = await getUserConfirmation();
        if (!shouldProceed) {
            console.log("❌ Email campaign cancelled by user.");
            return;
        }
        // Determine which users to send to
        const targetUsers = users;
        console.log(`\n🚀 Starting to send ${targetUsers.length} emails...\n`);
        let successCount = 0;
        let failureCount = 0;
        // Send emails
        for (let i = 0; i < targetUsers.length; i++) {
            const user = targetUsers[i];
            console.log(`[${i + 1}/${targetUsers.length}] Sending to ${user.name} (${user.email})...`);
            const success = await sendAnnouncementEmail(user.email, user.name);
            if (success) {
                successCount++;
            }
            else {
                failureCount++;
            }
            // Add delay between emails if configured
            if (ANNOUNCEMENT_CONFIG.delayBetweenEmails > 0 && i < targetUsers.length - 1) {
                await delay(ANNOUNCEMENT_CONFIG.delayBetweenEmails);
            }
        }
        // Summary
        console.log("\n" + "═".repeat(50));
        console.log("📊 CAMPAIGN SUMMARY");
        console.log("═".repeat(50));
        console.log(`✅ Successful: ${successCount}`);
        console.log(`❌ Failed: ${failureCount}`);
        console.log(`📧 Total: ${targetUsers.length}`);
        console.log("═".repeat(50));
    }
    catch (error) {
        console.error("❌ Error during announcement campaign:", error);
    }
    finally {
        await pool.end();
    }
}
// Run the script
sendAnnouncementToAllUsers();
export { sendAnnouncementToAllUsers };
