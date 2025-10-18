import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User";
import databaseConnection from "@/app/config/database.config";
import { encryptData } from "@/app/config/cipher.config";
import { createToken } from "@/app/config/jwt.config";

export async function POST(req: NextRequest) {
  try {
    await databaseConnection();
    const body = await req.json();
    const { metamask, loginType } = body;
    if (!metamask || !loginType) {
      return NextResponse.json(
        { message: "MetaMask address is required" },
        { status: 400 }
      );
    }

    let user = await User.findOne({ metamask: encryptData(metamask) });
    if (!user) {
      user = new User({
        metamask: encryptData(metamask),
        loginType: loginType,
      });

      await user.save();
    }
    const token = createToken({ agentId: user.metamask });
    return NextResponse.json(
      { message: "Login successfully", token: token },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error", error: (error as Error).message },
      { status: 500 }
    );
  }
}
