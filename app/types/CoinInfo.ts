export interface CoinInfo {
  id: string;
  symbol: string;
  name: string;

  image: {
    thumb: string;
    small: string;
    large: string;
  };

  market_data: {
    current_price: {
      usd: number;
      [key: string]: number;
    };
    market_cap: {
      usd: number;
      [key: string]: number;
    };
    total_supply: number | null;
    max_supply: number | null;
    circulating_supply: number;
  };

  links: {
    homepage: string[];
    blockchain_site: string[];
    repos_url: {
      github: string[];
    };
  };

  community_data: {
    twitter_followers: number | null;
    reddit_subscribers: number | null;
  };

  description: {
    en: string;
  };

  // CoinGecko does not give founder directly, 
  // but sometimes it's in the description
  // or in "links" → "homepage"/"repos_url".
  founder?: string;

  // For charts (price history), you must call
  // `/coins/{id}/market_chart?vs_currency=usd&days=30`
  chart_data?: {
    prices: [number, number][];       // [timestamp, price]
    market_caps: [number, number][];
    total_volumes: [number, number][];
  };
}
