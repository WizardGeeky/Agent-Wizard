import { NextRequest, NextResponse } from "next/server";
import { runner } from "@/app/adk/agent/chatAgent";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    const response = await runner.ask(message);
    return NextResponse.json({ reply: response });
  } catch (err) {
    console.error("Agent API error:", err);
    return NextResponse.json(
      { reply: "⚠️ Something went wrong." },
      { status: 500 }
    );
  }
}
