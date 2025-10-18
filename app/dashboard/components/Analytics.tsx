"use client";

import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartConfig,
} from "@/components/ui/chart";

interface CoinDetails {
  id: string;
  symbol: string;
  name: string;
  image: { small: string };
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    total_supply: number | null;
    max_supply: number | null;
    circulating_supply: number;
  };
}

export default function Analytics() {
  const [assets, setAssets] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [coinInfo, setCoinInfo] = useState<CoinDetails | null>(null);
  const [coinLoading, setCoinLoading] = useState(false);

  const [chartType, setChartType] = useState("price");
  const [duration, setDuration] = useState("1");
  const [chartData, setChartData] = useState<any[]>([]);
  const [coinId, setCoinId] = useState<string | undefined>();

  // Chart config (dynamic label depending on chartType)
  const chartConfig: ChartConfig = {
    value: {
      label: chartType === "price" ? "Price (USD)" : "Market Cap (USD)",
      color: "hsl(var(--chart-1))",
    },
  };

  useEffect(() => {
    const fetchChartHistory = async () => {
      if (!coinId) return;
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${duration}`
        );
        if (!res.ok) {
          toast.error("HTTP error fetching chart");
        }
        const data = await res.json();

        // transform for Recharts
        const formatted = (
          chartType === "price" ? data.prices : data.market_caps
        ).map(([time, value]: [number, number]) => ({
          time: new Date(time).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          value,
        }));

        setChartData(formatted);
      } catch (error) {
        toast.error("Unable to fetch data");
      }
    };
    fetchChartHistory();
  }, [duration, coinId, chartType]);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("userId") || "" : "";

  const fetchMonitoredAssets = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/v1/assets/monitor?userId=${token}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error("Failed to fetch monitored assets");
      }

      const fetchedAssets = data.assets || [];
      setAssets(fetchedAssets);

      if (fetchedAssets.length > 0) {
        setSelectedAsset(fetchedAssets[0]);
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCoinInfo = async (name: string) => {
    setCoinInfo(null);
    setCoinLoading(true);
    try {
      const res = await fetch("/api/v1/assets/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.toLowerCase() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      setCoinInfo(data);
      setCoinId(data.id);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setCoinLoading(false);
    }
  };

  useEffect(() => {
    fetchMonitoredAssets();
  }, []);

  useEffect(() => {
    if (selectedAsset) {
      fetchCoinInfo(selectedAsset);
    }
  }, [selectedAsset]);

  return (
    <div className="flex items-center justify-center w-full flex-col space-y-4">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-10">
        {/* Monitored Assets */}
        <div className="border p-4 rounded-md">
          <h2 className="font-semibold text-lg mb-2">
            Monitored Assets (<span>{assets.length}</span>)
          </h2>
          {loading ? (
            <p>Loading...</p>
          ) : assets.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {assets.map((asset, index) => (
                <li
                  key={index}
                  className={`px-2 py-1 rounded-xl cursor-pointer ${
                    selectedAsset === asset.toLowerCase()
                      ? "bg-blue-200 dark:bg-blue-700 font-semibold"
                      : "bg-gray-100 dark:bg-gray-700"
                  }`}
                  onClick={() => setSelectedAsset(asset.toLowerCase())}
                >
                  {asset}
                </li>
              ))}
            </ul>
          ) : (
            <p>No monitored assets found.</p>
          )}
        </div>

        {/* Coin Info */}
        <div className="border p-4 rounded-md">
          {coinLoading && <p>Loading coin info...</p>}
          {coinInfo && (
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <img
                  src={coinInfo.image.small}
                  alt={coinInfo.name}
                  className="w-8 h-8"
                />
                <h3 className="text-lg font-semibold">
                  {coinInfo.name} ({coinInfo.symbol.toUpperCase()})
                </h3>
              </div>
              <p>
                Current Price (USD): ${coinInfo.market_data.current_price.usd}
              </p>
              <p>
                Market Cap: $
                {coinInfo.market_data.market_cap.usd.toLocaleString()}
              </p>
              <p>Total Supply: {coinInfo.market_data.total_supply ?? "N/A"}</p>
              <p>Max Supply: {coinInfo.market_data.max_supply ?? "N/A"}</p>
              <p>
                Circulating Supply: {coinInfo.market_data.circulating_supply}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Chart + Controls */}
      <div className="feed my-4 w-full border p-4 rounded-md">
        <AnimatePresence mode="wait">
          {selectedAsset ? (
            <motion.div
              key={selectedAsset}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col gap-3"
            >
              {/* Tabs + Duration */}
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <Tabs
                  defaultValue="price"
                  onValueChange={(v) => setChartType(v)}
                  className="w-full md:w-auto"
                >
                  <TabsList className="w-full md:w-auto grid grid-cols-2 gap-2">
                    <TabsTrigger value="price" className="w-full">
                      Price
                    </TabsTrigger>
                    <TabsTrigger value="marketcap" className="w-full">
                      Market Cap
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <RadioGroup
                  value={duration}
                  onValueChange={setDuration}
                  className="flex justify-between md:justify-end gap-4 w-full"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="option-one" />
                    <Label htmlFor="option-one">24H</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="7" id="option-two" />
                    <Label htmlFor="option-two">7D</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="30" id="option-three" />
                    <Label htmlFor="option-three">1M</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="365" id="option-three" />
                    <Label htmlFor="option-three">1Y</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="w-full h-72">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient
                          id="blueGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#3b82f6"
                            stopOpacity={0.4}
                          />
                          <stop
                            offset="95%"
                            stopColor="#3b82f6"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>

                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />

                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                      />

                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fill="url(#blueGradient)"
                      />

                      <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </motion.div>
          ) : (
            <p>Activity feed coming soon...</p>
          )}
        </AnimatePresence>
      </div>

      <ToastContainer />
    </div>
  );
}
