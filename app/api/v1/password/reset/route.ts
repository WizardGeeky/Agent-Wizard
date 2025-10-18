// /app/api/v1/password/reset/route.ts
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User";
import databaseConnection from "@/app/config/database.config";
import { encryptData } from "@/app/config/cipher.config";

export async function POST(request: NextRequest) {
  try {
    await databaseConnection();

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find the user by encrypted email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Encrypt the new password and save
    user.password = encryptData(password);
    await user.save();

    return NextResponse.json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("Reset password error:", err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
