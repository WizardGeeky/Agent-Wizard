import { NextResponse } from "next/server";
import { CoinInfo } from "@/app/types/CoinInfo";

const COINGECKO_BASE = "https://api.coingecko.com/api/v3";

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Coin name is required" }, { status: 400 });
    }

    // Fetch full details directly by coin "id" (name)
    const detailsRes = await fetch(
      `${COINGECKO_BASE}/coins/${name}?localization=false&tickers=false&community_data=true&developer_data=true&sparkline=true`
    );

    if (!detailsRes.ok) {
      return NextResponse.json(
        { error: "Coin not found or invalid name" },
        { status: detailsRes.status }
      );
    }

    const details: CoinInfo = await detailsRes.json();

    return NextResponse.json(details);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
