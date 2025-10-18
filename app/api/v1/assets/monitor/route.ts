import { NextRequest, NextResponse } from "next/server";
import databaseConnection from "@/app/config/database.config";
import AssetMonitor from "@/app/models/AssetMonitor";
import User from "@/app/models/User";
import { decodeToken, isTokenExpired } from "@/app/config/jwt.config";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await databaseConnection();
    const { userId: token, assets } = await request.json();

    // Validate input
    if (!token || !assets || !Array.isArray(assets) || assets.length === 0) {
      return NextResponse.json(
        { error: "Token and assets are required" },
        { status: 400 }
      );
    }

    // Decode token
    const decoded = decodeToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // Check token expiry
    if (isTokenExpired(decoded)) {
      return NextResponse.json({ error: "Token has expired" }, { status: 400 });
    }

    const actualUserId = decoded.agentId;
    // Check if user exists
    const userExists = await User.findOne({
      $or: [{ email: actualUserId }, { metamask: actualUserId }],
    });

    if (!userExists) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    // Find existing asset monitor for the user
    const userMonitor = await AssetMonitor.findOne({ userId: actualUserId });

    if (userMonitor) {
      // Add only new assets
      const newAssets = assets.filter(
        (a: string) => !userMonitor.assets.includes(a)
      );
      if (newAssets.length > 0) {
        userMonitor.assets.push(...newAssets);
        await userMonitor.save();
      }
      return NextResponse.json(
        {
          message: `Assets updated for ${actualUserId}`,
          addedAssets: newAssets,
        },
        { status: 200 }
      );
    } else {
      // Create new monitor
      const newMonitor = new AssetMonitor({ userId: actualUserId, assets });
      await newMonitor.save();
      return NextResponse.json(
        { message: `Assets created for ${actualUserId}`, addedAssets: assets },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create/update asset monitor" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await databaseConnection();
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("userId");
    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }
    // Decode token
    const decoded = decodeToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }
    // Check token expiry
    if (isTokenExpired(decoded)) {
      return NextResponse.json({ error: "Token has expired" }, { status: 400 });
    }
    const actualUserId = decoded.agentId;
    // Check if user exists
    const userExists = await User.findOne({
      $or: [{ email: actualUserId }, { metamask: actualUserId }],
    });
    if (!userExists) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    // Find existing asset monitor for the user
    const userMonitor = await AssetMonitor.findOne({ userId: actualUserId });
    if (userMonitor) {
      return NextResponse.json({ assets: userMonitor.assets }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "No assets found for this user" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch asset monitor" },
      { status: 500 }
    );
  }
}
