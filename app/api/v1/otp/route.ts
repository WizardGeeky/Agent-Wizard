import { NextRequest, NextResponse } from "next/server";
import databaseConnection from "@/app/config/database.config";
import Otp from "@/app/models/Otp";
import User from "@/app/models/User";
import { encryptData } from "@/app/config/cipher.config";
import { sendOTPEmail } from "@/app/utils/templates/otpTemplate";

export async function POST(request: NextRequest): Promise<NextResponse> {
  await databaseConnection();

  try {
    const { email } = await request.json();
    if (!email) return NextResponse.json({ message: "Email is required" }, { status: 400 });

    const encryptedEmail = encryptData(email);

    // Check if user already exists
    const existingUser = await User.findOne({ email: encryptedEmail });
    if (existingUser) return NextResponse.json({ message: "User already exists" }, { status: 400 });

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); 
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000);
    const encryptedOtp = encryptData(otp);

    // Upsert OTP
    await Otp.findOneAndUpdate(
      { email: encryptedEmail },
      { $set: { email: encryptedEmail, otp: encryptedOtp, expiresAt, verified: false } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    await sendOTPEmail(email, otp);

    return NextResponse.json({ message: "OTP sent successfully" }, { status: 200 });
  } catch (err) {
    console.error("OTP generation error:", err);
    return NextResponse.json({ message: "OTP generation failed" }, { status: 500 });
  }
}
