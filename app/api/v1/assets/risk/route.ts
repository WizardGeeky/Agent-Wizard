import { NextRequest, NextResponse } from "next/server";
import databaseConnection from "@/app/config/database.config";
import RiskConfig from "@/app/models/RiskConfig";
import User from "@/app/models/User";
import { decodeToken, isTokenExpired } from "@/app/config/jwt.config";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await databaseConnection();
    const {
      token,
      coinSymbol,
      maxPriceDropPercent,
      maxTradeVolumePercent,
      minLiquidity,
      notifications,
      notificationIds,
    } = await request.json();

    // Validate input
    if (!token || !coinSymbol) {
      return NextResponse.json(
        { error: "Token and coinSymbol are required" },
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

    // Check if a risk config already exists for this coin
    const existingConfig = await RiskConfig.findOne({
      userId: actualUserId,
      coinSymbol,
    });
    if (existingConfig) {
      return NextResponse.json(
        { error: `Risk configuration for ${coinSymbol} already exists` },
        { status: 400 }
      );
    }

    // Create new risk config
    const newConfig = new RiskConfig({
      userId: actualUserId,
      coinSymbol,
      maxPriceDropPercent,
      maxTradeVolumePercent,
      minLiquidity,
      notifications,
      notificationIds,
    });

    await newConfig.save();

    return NextResponse.json({
      message: `Risk configuration for ${coinSymbol} saved successfully`,
    });
  } catch (error: any) {
    console.error("Failed to save risk config:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
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

    // Fetch user's risk configurations (all records)
    const riskConfigs = await RiskConfig.find({ userId: actualUserId });

    if (!riskConfigs || riskConfigs.length === 0) {
      return NextResponse.json(
        { error: "No risk configuration found" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        riskConfigs: riskConfigs.map((cfg) => ({
          coinSymbol: cfg.coinSymbol,
          maxPriceDropPercent: cfg.maxPriceDropPercent,
          maxTradeVolumePercent: cfg.maxTradeVolumePercent,
          minLiquidity: cfg.minLiquidity,
          notifications: cfg.notifications,
        })),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching risk config:", error);
    return NextResponse.json(
      { error: "Failed to fetch risk configuration" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    await databaseConnection();

    const { searchParams } = new URL(request.url);
    const token = searchParams.get("userId");
    const coinSymbol = searchParams.get("coinSymbol");

    if (!token || !coinSymbol) {
      return NextResponse.json(
        { error: "Token and coinSymbol are required" },
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

    // Delete the risk config
    const deletedConfig = await RiskConfig.findOneAndDelete({
      userId: actualUserId,
      coinSymbol,
    });

    if (!deletedConfig) {
      return NextResponse.json(
        { error: "No matching risk configuration found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: `Risk configuration for ${coinSymbol} deleted successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting risk config:", error);
    return NextResponse.json(
      { error: "Failed to delete risk configuration" },
      { status: 500 }
    );
  }
}
