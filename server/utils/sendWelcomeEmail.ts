import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const CLIENT_URL = 'https://teskro.com';

// Capitalize each word in the name
function formatName(name: string): string {
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    const formattedName = formatName(name);

    await resend.emails.send({
      from: 'Teskro <welcome@teskro.com>',
      to: email,
      subject: '🚀 Welcome to Teskro – Start Generating AI-Powered Exams',
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; background-color: #f4f4f7; padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 6px 18px rgba(0,0,0,0.05);">
            <h1 style="font-size: 26px; margin-bottom: 12px;">Hi ${formattedName}, welcome to <span style="color: #3b82f6;">Teskro</span>! 👋</h1>
            <p style="font-size: 16px; line-height: 1.6;">
              I'm excited to have you on board! Teskro helps you generate custom, AI-powered practice exams for cloud certifications and more — including AWS, Google Cloud, and Azure.
            </p>
            <p style="font-size: 16px; line-height: 1.6;">
              Your personal dashboard is ready. You can start generating practice tests, track your performance, and sharpen your skills anytime.
            </p>
            <div style="margin: 30px 0;">
              <a href="${CLIENT_URL}/home" style="display: inline-block; padding: 14px 28px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                Go to Your Dashboard
              </a>
            </div>
            <p style="font-size: 14px; color: #666;">
              Have questions, feedback, or ideas? Feel free to reach out to me directly at <a href="mailto:naymondavid@gmail.com">naymondavid@gmail.com</a>. I’d love to hear from you.
            </p>
            <p style="font-size: 14px; color: #666; margin-top: 40px;">
              Thanks again for joining,  
              <br>– David
            </p>
          </div>
        </div>
      `,
    });
    console.log(`Welcome email sent to ${email}`);
  } catch (err) {
    console.error("Failed to send welcome email:", err);
  }
}
