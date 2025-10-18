import { transporter } from "@/app/config/nodemailer.config";

const sendWelcomeEmail = async (email: string, userName: string) => {
  const mailOptions = {
    from: process.env.NEXT_PUBLIC_PERSONAL_EMAIL,
    to: email,
    subject: "Welcome to Agent Wizard 🚀",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; color: #333; background: #f9fafb;">
        <h1 style="color: #1f2937; text-align: center;">Welcome to <span style="color:#0ea5e9;">Agent Wizard</span>!</h1>
        <p>Hi ${userName},</p>
        <p>We're thrilled to have you onboard. Agent Wizard empowers you to:</p>
        
        <ul style="list-style: none; padding: 0;">
          <li style="margin: 10px 0; display: flex; align-items: center;">
            <span style="font-size: 18px; margin-right: 10px;">💹</span> Analyze Web3 trading trends seamlessly
          </li>
          <li style="margin: 10px 0; display: flex; align-items: center;">
            <span style="font-size: 18px; margin-right: 10px;">⚖️</span> Perform risk assessments for smarter decisions
          </li>
          <li style="margin: 10px 0; display: flex; align-items: center;">
            <span style="font-size: 18px; margin-right: 10px;">🤖</span> Instance Notifications based on risk configuration with help of AI Agents
          </li>
        </ul>

        
        <p style="margin-top: 20px;">Need help? Our team is always ready to assist you. Reach out anytime and stay ahead in Web3 trading.</p>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />

        <p style="color: #666; font-size: 12px; text-align: center;">
          You're receiving this email because you signed up for Agent Wizard. 
          This is an automated message, please do not reply directly. 
          © 2025 Agent Wizard
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent`);
  } catch (error) {
    console.error("❌ Error sending welcome email:", error);
  }
};

export { sendWelcomeEmail };
