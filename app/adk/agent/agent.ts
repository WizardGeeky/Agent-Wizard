import { AgentBuilder } from "@iqai/adk";
import { telegramTools } from "../tools/telegramTool";

export const { runner } = await AgentBuilder.create("telegram_bot")
  .withModel("gemini-2.5-flash")
  .withTools(...telegramTools)
  .build();
