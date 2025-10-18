"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FaTelegramPlane, FaEnvelope } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { AiTwotoneDelete } from "react-icons/ai";

interface Coin {
  symbol: string;
  name?: string;
}

interface RiskConfig {
  coinSymbol: string;
  maxPriceDropPercent: number;
  maxTradeVolumePercent: number;
  minLiquidity: number;
  notifications: {
    telegram: boolean;
    email: boolean;
  };
  notificationIds: {
    telegram?: string;
    email?: string;
  };
}

export default function RiskAnalysisEngine() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<string>("");
  const [maxPriceDrop, setMaxPriceDrop] = useState<string>("");
  const [maxTradeVolume, setMaxTradeVolume] = useState<string>("");
  const [minLiquidity, setMinLiquidity] = useState<string>("");
  const [riskConfigs, setRiskConfigs] = useState<RiskConfig[]>([]);
  const [notifications, setNotifications] = useState({
    telegram: false,
    email: false,
  });
  const [notificationIds, setNotificationIds] = useState({
    telegram: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("userId") || "" : "";

  const fetchRiskConfigs = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/assets/risk?userId=${token}`);
      const data = await res.json();
      if (res.ok) setRiskConfigs(data.riskConfigs);
    } catch (err) {
      console.error(err);
      toast.error("Error fetching risk configuration");
    } finally {
      setLoading(false);
    }
  };

  const fetchCoins = async () => {
    if (!token) return;
    try {
      const res = await fetch(`/api/v1/assets/monitor?userId=${token}`);
      const data = await res.json();
      if (res.ok && data.assets) {
        setCoins(data.assets);
        if (data.assets.length > 0) setSelectedCoin(data.assets[0]);
      }
    } catch (err) {
      console.error("Failed to fetch coins:", err);
      toast.error("Failed to fetch coins");
    }
  };

  useEffect(() => {
    fetchCoins();
    fetchRiskConfigs();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation: If notification selected, ID must be provided
    for (const key of Object.keys(
      notifications
    ) as (keyof typeof notifications)[]) {
      if (notifications[key] && !notificationIds[key]) {
        toast.error(`Please provide your ${key} ID.`);
        return;
      }
    }

    setSaving(true);
    try {
      const res = await fetch("/api/v1/assets/risk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          coinSymbol: selectedCoin,
          maxPriceDropPercent: Number(maxPriceDrop),
          maxTradeVolumePercent: Number(maxTradeVolume),
          minLiquidity: Number(minLiquidity),
          notifications,
          notificationIds,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Configuration saved successfully");
        await fetchRiskConfigs();
        setMaxPriceDrop("");
        setMaxTradeVolume("");
        setMinLiquidity("");
        setNotifications({
          telegram: false,
          email: false,
        });
        setNotificationIds({
          telegram: "",
          email: "",
        });
      } else {
        toast.warning(data.error || "Failed to save configuration");
      }
    } catch (err) {
      toast.error("Error saving configuration");
    } finally {
      setSaving(false);
    }
  };

  // Framer Motion variants
  const formVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  const rowVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 14 },
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  const buttonVariant = {
    hover: { scale: 1.05, boxShadow: "0px 5px 10px rgba(0,0,0,0.15)" },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="flex flex-col justify-center w-full"
      initial="hidden"
      animate="visible"
    >
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <h2 className="text-xl font-semibold mb-4">
        Advanced Risk Configuration
      </h2>

      <motion.form
        className="w-full p-6 border-2 rounded-lg my-4"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 lg:gap-4">
          {/* Monitored Coins */}
          <div>
            <Label className="py-2">Monitored Coins</Label>
            <Select value={selectedCoin} onValueChange={setSelectedCoin}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Coin" />
              </SelectTrigger>
              <SelectContent>
                {coins.length === 0 ? (
                  <SelectItem value="none" disabled>
                    No coins available
                  </SelectItem>
                ) : (
                  coins.map((coin: any) => (
                    <SelectItem key={coin} value={coin}>
                      {coin}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="py-2">Max Price Drop (%)</Label>
            <Input
              type="number"
              value={maxPriceDrop}
              required
              placeholder="e.g., 10"
              onChange={(e) => setMaxPriceDrop(e.target.value)}
            />
          </div>

          <div>
            <Label className="py-2">Max Trade Volume (%)</Label>
            <Input
              type="number"
              value={maxTradeVolume}
              required
              placeholder="e.g., 5"
              onChange={(e) => setMaxTradeVolume(e.target.value)}
            />
          </div>

          <div>
            <Label className="py-2">Min Liquidity</Label>
            <Input
              type="number"
              value={minLiquidity}
              required
              placeholder="e.g., 1000"
              onChange={(e) => setMinLiquidity(e.target.value)}
            />
          </div>
        </div>

        {/* Notifications */}
        <div className="w-full my-8">
          <Label className="py-2 text-center">Enable Notifications</Label>
          <div className="grid grid-cols-1 lg:grid-cols-4 w-full gap-2 mt-2 justify-around">
            {(["telegram", "email"] as const).map((key) => {
              const Icon = {
                telegram: FaTelegramPlane,
                email: FaEnvelope,
              }[key];
              return (
                <div key={key} className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={notifications[key]}
                      onCheckedChange={(val) =>
                        setNotifications({ ...notifications, [key]: val })
                      }
                    />
                    <Icon
                      className={
                        key === "telegram"
                          ? "text-blue-500"
                          : key === "email"
                          ? "text-red-500"
                          : "text-gray-500"
                      }
                    />
                  </label>
                  {/* Show input if notification is selected */}
                  {notifications[key] && (
                    <Input
                      placeholder={`Enter your ${key} ID`}
                      value={notificationIds[key]}
                      onChange={(e) =>
                        setNotificationIds({
                          ...notificationIds,
                          [key]: e.target.value,
                        })
                      }
                      className="w-full text-sm my-2"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex">
          <motion.div
            variants={buttonVariant}
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              type="submit"
              className="px-6 py-2 rounded-lg"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Configuration"}
            </Button>
          </motion.div>
        </div>
      </motion.form>

      {/* Risk Config Table */}
      <div className="w-full overflow-x-auto my-5 lg:my-10 border rounded shadow-sm">
        {loading && riskConfigs.length === 0 ? (
          <p className="text-center py-4">Loading risk configuration...</p>
        ) : riskConfigs.length === 0 ? (
          <p className="text-center py-4">No risk configuration found.</p>
        ) : (
          <table className="min-w-full border-collapse table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Coin Symbol</th>
                <th className="px-4 py-2 border">Max Price Drop (%)</th>
                <th className="px-4 py-2 border">Max Trade Volume (%)</th>
                <th className="px-4 py-2 border">Min Liquidity</th>
                <th className="px-4 py-2 border">Notification Channel</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {riskConfigs.map((cfg) => (
                  <motion.tr
                    key={cfg.coinSymbol}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="text-center"
                  >
                    <td className="px-4 py-2 border">{cfg.coinSymbol}</td>
                    <td className="px-4 py-2 border">
                      {cfg.maxPriceDropPercent}
                    </td>
                    <td className="px-4 py-2 border">
                      {cfg.maxTradeVolumePercent}
                    </td>
                    <td className="px-4 py-2 border">{cfg.minLiquidity}</td>
                    <td className="px-4 py-2 border space-x-2">
                      {" "}
                      {Object.entries(cfg.notifications).map(([key, val]) =>
                        val ? (
                          <span
                            key={key}
                            className="inline-block px-2 py-1 rounded text-xs"
                          >
                            {" "}
                            {key}{" "}
                          </span>
                        ) : null
                      )}{" "}
                    </td>

                    <td className="px-4 py-2 border text-center">
                      <motion.button
                        onClick={async () => {
                          try {
                            const res = await fetch(
                              `/api/v1/assets/risk?userId=${token}&coinSymbol=${cfg.coinSymbol}`,
                              { method: "DELETE" }
                            );
                            const data = await res.json();
                            if (res.ok) {
                              toast.success(data.message);
                              await fetchRiskConfigs();
                            } else {
                              toast.error(data.error || "Failed to delete");
                            }
                          } catch {
                            toast.error("Error deleting configuration");
                          }
                        }}
                        className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium"
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "#dc2626",
                          boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
                        }}
                        whileTap={{
                          scale: 0.95,
                          boxShadow: "0px 2px 8px rgba(0,0,0,0.2)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        <AiTwotoneDelete />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  );
}
