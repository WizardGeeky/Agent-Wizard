import { NextRequest, NextResponse } from "next/server";
import databaseConnection from "@/app/config/database.config";
import User from "@/app/models/User";
import { encryptData } from "@/app/config/cipher.config";
import { createToken } from "@/app/config/jwt.config";

export async function POST(request: NextRequest): Promise<NextResponse> {
  await databaseConnection();

  try {
    const { email, password } = await request.json();

    const encryptedEmail = encryptData(email);
    const encryptedPassword = encryptData(password);

    const user = await User.findOne({
      email: encryptedEmail,
      password: encryptedPassword,
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = createToken({ agentId: user.email });
    return NextResponse.json(
      { message: "Login successfully", token: token },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "login failed" },
      { status: 500 }
    );
  }
}
