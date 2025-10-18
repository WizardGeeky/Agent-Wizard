import { NextRequest, NextResponse } from "next/server";
import Otp from "@/app/models/Otp";
import { encryptData } from "@/app/config/cipher.config";
import databaseConnection from "@/app/config/database.config";

export async function POST(request: NextRequest): Promise<NextResponse> {
  await databaseConnection();
  try {
    const { email, otp } = await request.json();

    const encryptedEmail = encryptData(email);
    const encryptedOtp = encryptData(otp);

    const record = await Otp.findOne({
      email: encryptedEmail,
      otp: encryptedOtp,
    });

    if (!record) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }

    if (record.expiresAt < new Date()) {
      await Otp.deleteOne({ _id: record._id });
      return NextResponse.json({ message: "OTP expired" }, { status: 400 });
    }

    record.verified = true;
    await record.save();

    return NextResponse.json(
      { message: "OTP verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json(
      { message: "OTP verification failed" },
      { status: 500 }
    );
  }
}
