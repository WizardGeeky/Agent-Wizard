import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User";
import databaseConnection from "@/app/config/database.config";
import { encryptData } from "@/app/config/cipher.config";
import { transporter } from "@/app/config/nodemailer.config";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await databaseConnection();
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email: encryptData(email) });
    if (!user) {
      return NextResponse.json({
        message: "email not found",
      });
    }

    const resetLink = `${
      process.env.NEXT_PUBLIC_APP_URL
    }/password/reset?token=${user.email}`;

    await transporter.sendMail({
      from: `"Agent Wizard" <no-reply@yourdomain.com>`,
      to: email,
      subject: "Reset your password",
      html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <p>Hello,</p>
      <p>You requested a password reset.</p>
      <p>
        Click the link below to reset your password:
      </p>
      <p>
        <a href="${resetLink}" style="display:inline-block; padding:10px 20px; background-color:#4F46E5; color:white; text-decoration:none; border-radius:5px;">
          Reset Password
        </a>
      </p>
      <p>If you did not request this, you can ignore this email.</p>
    </div>
  `,
    });

    return NextResponse.json({
      message: "Reset Link send to your email",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
