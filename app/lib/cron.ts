import cron from "node-cron";
import RiskConfig, { IRiskConfig } from "../models/RiskConfig";
import databaseConnection from "../config/database.config";
import { runner } from "../adk/agent/agent";
import { sendCryptoNotification } from "../utils/templates/cryptoNotification";

const COINGECKO_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";

async function fetchCoinData(coinSymbols: string[]) {
  const ids = coinSymbols.map((c) => c.toLowerCase()).join(",");
  const res = await fetch(`${COINGECKO_URL}&ids=${ids}`);
  if (!res.ok) throw new Error(`CoinGecko error: ${res.status}`);
  return await res.json();
}

async function sendTelegramAlert(chatId: string, message: string) {
  try {
    await runner.ask(
      `Send a message to telegram channel ${chatId} and say ${message}`
    );
    console.log(`📩 Telegram message sent to ${chatId}: ${message}`);
  } catch (err) {
    console.error("❌ Failed to send Telegram message:", err);
  }
}

async function checkRisks() {
  await databaseConnection();

  const configs: IRiskConfig[] = await RiskConfig.find({});
  if (configs.length === 0) return;

  const coinSymbols = [...new Set(configs.map((c) => c.coinSymbol))];
  const marketData = await fetchCoinData(coinSymbols);

  for (const config of configs) {
    const coin = marketData.find(
      (c: any) =>
        c.id.toLowerCase() === config.coinSymbol.toLowerCase() ||
        c.symbol.toLowerCase() === config.coinSymbol.toLowerCase()
    );
    if (!coin) continue;

    let triggered = false;
    let message = "";

    // 📉 Price Drop Alert
    if (coin.price_change_percentage_24h <= -config.maxPriceDropPercent) {
      message = `📉 [${
        config.coinSymbol
      }] Price Alert: Dropped ${coin.price_change_percentage_24h.toFixed(
        2
      )}% in the last 24h. ⚠️ Consider reviewing stop-loss levels or reducing exposure.`;
      triggered = true;
    }

    // 📊 Volume Surge Alert
    const volumePercent = (coin.total_volume / coin.market_cap) * 100;
    if (volumePercent >= config.maxTradeVolumePercent) {
      message = `📊 [${
        config.coinSymbol
      }] Volume Surge: Trading volume reached ${volumePercent.toFixed(
        2
      )}% of market cap. 🚀 Watch for potential pump-and-dump activity or breakout signals.`;
      triggered = true;
    }

    // 💧 Liquidity Risk Alert
    if (
      coin.liquidity_score !== null &&
      coin.liquidity_score < config.minLiquidity
    ) {
      message = `💧 [${config.coinSymbol}] Liquidity Risk: Current liquidity score is ${coin.liquidity_score}, below your threshold (${config.minLiquidity}). ⚠️ Selling large amounts may cause significant slippage.`;
      triggered = true;
    }

    if (triggered) {
      console.log(message);

      if (config.notifications.telegram) {
        const userChatId = config.notificationIds.telegram;
        if (userChatId) {
          await sendTelegramAlert(userChatId, message);
        }
      }

      if (config.notifications.email) {
        const userEmailId = config.notificationIds.email;
        if (userEmailId) {
          await sendCryptoNotification(userEmailId, message);
        }
      }
    } else {
      console.log(
        `✅ [${config.coinSymbol}] No triggers for user ${config.userId}`
      );
    }
  }
}

export default function startRiskCron() {
  
  cron.schedule("*/2 * * * *", async () => {
    console.log("⏰ Running risk checks at", new Date().toISOString());
    try {
      await checkRisks();
    } catch (err) {
      console.error("❌ Risk check failed:", err);
    }
  });

}

