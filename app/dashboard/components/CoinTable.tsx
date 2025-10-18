"use client";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Button } from "@/components/ui/button";
import { MdAddchart } from "react-icons/md";

import { toast, ToastContainer } from "react-toastify";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  sparkline_in_7d: { price: number[] };
}

export default function CoinsTable() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(12);

  const userId = localStorage.getItem("userId") ;

  // Update perPage based on screen size
  useEffect(() => {
    const updatePerPage = () => {
      setPerPage(window.innerWidth >= 1024 ? 12 : 8);
    };
    updatePerPage();
    window.addEventListener("resize", updatePerPage);
    return () => window.removeEventListener("resize", updatePerPage);
  }, []);

  const fetchCoins = async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${pageNum}&sparkline=true&price_change_percentage=1h,24h,7d`
      );
      const data = await res.json();
      setCoins(data);
    } catch (error) {
      toast.error("Failed to fetch coins");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins(page);
  }, [page, perPage]);

  // Add coin to monitor
  const handleAddToMonitor = async (coinName: string) => {
    try {
      const res = await fetch("/api/v1/assets/monitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, assets: [coinName] }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to add asset");
      }

      toast.success(`${coinName} added to monitor!`);
    } catch (error: any) {
      console.error("Error adding to monitor:", error);
      toast.error(error.message || "Failed to add asset");
    }
  };

  return (
    <div className="w-full space-y-4 cursor-default">
      {/* Coins Table */}
      <div className="overflow-x-auto rounded-md border">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Coin</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">1h</th>
              <th className="px-4 py-3">24h</th>
              <th className="px-4 py-3">7d</th>
              <th className="px-4 py-3">24h Volume</th>
              <th className="px-4 py-3">Market Cap</th>
              <th className="px-4 py-3">Last 7 Days</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {loading ? (
              <tr>
                <td colSpan={10} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : (
              coins.map((coin, index) => (
                <tr
                  key={coin.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                >
                  <td className="px-4 py-2">{(page - 1) * perPage + index + 1}</td>
                  <td className="px-4 py-2 flex items-center gap-2">
                    <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                    <span className="font-medium">{coin.name}</span>
                    <span className="text-gray-500 uppercase">{coin.symbol}</span>
                  </td>
                  <td className="px-4 py-2">${coin.current_price.toLocaleString()}</td>
                  <td
                    className={`px-4 py-2 ${
                      coin.price_change_percentage_1h_in_currency >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {coin.price_change_percentage_1h_in_currency?.toFixed(2)}%
                  </td>
                  <td
                    className={`px-4 py-2 ${
                      coin.price_change_percentage_24h_in_currency >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {coin.price_change_percentage_24h_in_currency?.toFixed(2)}%
                  </td>
                  <td
                    className={`px-4 py-2 ${
                      coin.price_change_percentage_7d_in_currency >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
                  </td>
                  <td className="px-4 py-2">${coin.total_volume.toLocaleString()}</td>
                  <td className="px-4 py-2">${coin.market_cap.toLocaleString()}</td>
                  <td className="px-4 py-2 w-32">
                    <div className="h-10">
                      <Line
                        data={{
                          labels: coin.sparkline_in_7d.price.map((_, i) => i),
                          datasets: [
                            {
                              data: coin.sparkline_in_7d.price,
                              borderColor:
                                coin.price_change_percentage_7d_in_currency >= 0
                                  ? "rgb(34,197,94)"
                                  : "rgb(239,68,68)",
                              borderWidth: 1.5,
                              pointRadius: 0,
                              fill: false,
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: true,
                          plugins: {
                            legend: { display: false },
                            tooltip: { enabled: true },
                          },
                          elements: { line: { tension: 0.3 } },
                          scales: { x: { display: false }, y: { display: false } },
                        }}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-2 flex">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="text-xs border-2 shadow-2xl"
                            onClick={() => handleAddToMonitor(coin.name)}
                          >
                            <MdAddchart className="cursor-pointer" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Add to Monitor</TooltipContent>
                      </Tooltip>

                      
                    </TooltipProvider>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          disabled={page === 1 || loading}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
        >
          Previous
        </Button>
        <span className="px-2 py-1 text-sm">Page {page}</span>
        <Button
          variant="outline"
          disabled={loading}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>

      <ToastContainer />
    </div>
  );
}
