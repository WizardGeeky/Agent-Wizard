import { transporter } from "@/app/config/nodemailer.config";

const sendOTPEmail = async (email: string, otp: string) => {
  const mailOptions = {
    from: process.env.NEXT_PUBLIC_PERSONAL_EMAIL,
    to: email,
    subject: "Your OTP Code",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; color: #333;">
        <h2 style="color: #007bff;">Your One-Time Password (OTP)</h2>
        <p>Hello,</p>
        <p>Your OTP code is:</p>
        <h1 style="background: #f3f4f6; display: inline-block; padding: 10px 20px; border-radius: 8px; font-size: 28px; letter-spacing: 4px; color: #111;">
          ${otp}
        </h1>
        <p style="margin-top: 20px;">⚠️ This OTP will expire in <strong>2 minutes</strong>. Please do not share it with anyone.</p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
        <p>If you did not request this, please ignore this email.</p>
        <p style="color: #666; font-size: 12px;">This is an automated email, please do not reply.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP email sent to ${email}`);
  } catch (error) {
    console.error("❌ Error sending OTP email:", error);
  }
};

export { sendOTPEmail };
