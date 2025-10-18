export default interface CoinEvent {
  coinSymbol: string;
  priceChangePercent: number;  // % change over last X minutes
  tradeVolumePercent: number;  // % change in volume
  liquidity: number;           // current liquidity
}