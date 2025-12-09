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
// ═══════════════════════════════════════════════════════════════════════════════
//                             ANNOUNCEMENT CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════
const ANNOUNCEMENT_CONFIG = {
    subject: "🤖 Introducing Teskro Assistant: Your New AI Study Companion",
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
    delayBetweenEmails: 500, // Delay between batches (ms)
    testEmails: null, // or: [{ email: "naymondavid@gmail.com", name: "david naymon" }],
};
async function getAllUsers() {
    try {
        const query = 'SELECT email, name FROM "users" ORDER BY email';
        const result = await pool.query(query);
        return result.rows;
    }
    catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}
async function sendEmailBatch(users) {
    const emails = users.map((user) => {
        const formattedName = user.name ? formatName(user.name) : "there";
        const personalizedHtml = ANNOUNCEMENT_CONFIG.htmlContent.replace(/{{name}}/g, formattedName);
        return {
            from: "Teskro <welcome@teskro.com>",
            to: [user.email],
            subject: ANNOUNCEMENT_CONFIG.subject,
            html: personalizedHtml,
        };
    });
    try {
        await resend.batch.send(emails);
        console.log(`✅ Batch of ${emails.length} emails sent.`);
        return emails.length;
    }
    catch (error) {
        console.error(`❌ Batch send failed:`, error);
        return 0;
    }
}
async function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
async function getUserConfirmation() {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question("Do you want to proceed with sending emails? (yes/no): ", (answer) => {
            rl.close();
            resolve(answer.toLowerCase() === "yes" || answer.toLowerCase() === "y");
        });
    });
}
async function sendAnnouncementBatch() {
    console.log("🚀 Starting announcement email campaign...\n");
    try {
        const users = ANNOUNCEMENT_CONFIG.testEmails ?? (await getAllUsers());
        if (users.length === 0) {
            console.log("No users found to send emails to.");
            return;
        }
        console.log(`📧 Found ${users.length} users to send emails to\n`);
        const previewUsers = users.slice(0, 10);
        console.log("👥 First 10 users who will receive emails:");
        console.log("═".repeat(60));
        previewUsers.forEach((user, index) => {
            console.log(`${index + 1}. ${user.name} (${user.email})`);
        });
        if (users.length > 10) {
            console.log(`... and ${users.length - 10} more users`);
        }
        console.log("═".repeat(60));
        console.log(`\nSubject: ${ANNOUNCEMENT_CONFIG.subject}\n`);
        const shouldProceed = await getUserConfirmation();
        if (!shouldProceed) {
            console.log("❌ Email campaign cancelled by user.");
            return;
        }
        let successCount = 0;
        for (let i = 0; i < users.length; i += 100) {
            const batch = users.slice(i, i + 100);
            console.log(`📦 Sending batch ${i / 100 + 1} (${batch.length} users)...`);
            const sent = await sendEmailBatch(batch);
            successCount += sent;
            if (ANNOUNCEMENT_CONFIG.delayBetweenEmails > 0 && i + 100 < users.length) {
                await delay(ANNOUNCEMENT_CONFIG.delayBetweenEmails);
            }
        }
        const failureCount = users.length - successCount;
        console.log("\n" + "═".repeat(50));
        console.log("📊 CAMPAIGN SUMMARY");
        console.log("═".repeat(50));
        console.log(`✅ Successful: ${successCount}`);
        console.log(`❌ Failed: ${failureCount}`);
        console.log(`📧 Total: ${users.length}`);
        console.log("═".repeat(50));
    }
    catch (error) {
        console.error("❌ Error during announcement campaign:", error);
    }
    finally {
        await pool.end();
    }
}
// Run it
sendAnnouncementBatch();
export { sendAnnouncementBatch };
