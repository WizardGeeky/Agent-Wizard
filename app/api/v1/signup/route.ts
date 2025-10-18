import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User";
import databaseConnection from "@/app/config/database.config";
import { decryptData, encryptData } from "@/app/config/cipher.config";
import Otp from "@/app/models/Otp";
import { sendWelcomeEmail } from "@/app/utils/templates/welcomeTemplate";

export async function POST(request: NextRequest): Promise<NextResponse> {
  await databaseConnection();

  try {
    const { name, email, password, loginType } = await request.json();

    if (!name || !email || !password || !loginType) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const encryptedEmail = encryptData(email);
    const encryptedPassword = encryptData(password);

    // ✅ Check if email already exists
    const existingUser = await User.findOne({ email: encryptedEmail });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }
    // ✅ Verify OTP
    const otpRecord = await Otp.findOne({ email: encryptedEmail });
    if (!otpRecord || !otpRecord.verified) {
      return NextResponse.json(
        { message: "Email not verified via OTP" },
        { status: 400 }
      );
    }

    // ✅ Create new user
    const user = new User({
      name,
      email: encryptedEmail,
      password: encryptedPassword,
      loginType: loginType,
    });

    await user.save();
    await Otp.deleteOne({ _id: otpRecord._id });
    await sendWelcomeEmail(decryptData(user.email), user.name);

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error signing up:", error);
    return NextResponse.json(
      { message: "User registration failed" },
      { status: 500 }
    );
  }
}
