import { McpTelegram } from "@iqai/adk";

const telegramToolSet = McpTelegram({
  env: {
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN!,
  },
});

export const telegramTools = await telegramToolSet.getTools();
