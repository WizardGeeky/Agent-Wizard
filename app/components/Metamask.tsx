"use client";

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Metamask() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 🔹 Trigger MetaMask connect + login on button click
  const handleMetamask = async () => {
    if (typeof window === "undefined") return;

    const ethereum = (window as any).ethereum;
    if (!ethereum || !ethereum.isMetaMask) {
      toast.error("MetaMask not detected");
      return;
    }

    try {
      setLoading(true);
      // Ask user to connect wallet (shows MetaMask popup)
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setLoading(false);

      if (!accounts || accounts.length === 0) {
        toast.error("No accounts found");
        return;
      }

      const metamask = accounts[0];
      await handleLogin(metamask);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to connect MetaMask");
    }
  };

  // 🔹 Reusable login logic
  const handleLogin = async (metamask: string) => {
    try {
      const loginType = "web3";
      const res = await fetch("/api/v1/login/metamask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ metamask, loginType }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("userId", data.token);
        router.push("/dashboard");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      toast.error("Something went wrong while logging in");
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0px 8px 15px rgba(0,0,0,0.2)" }}
        whileTap={{ scale: 0.95 }}
        className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg text-black font-medium transition-all duration-300
                    ${
                      loading
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-white border"
                    }`}
        onClick={handleMetamask}
        disabled={loading}
      >
        <img
          src="https://images.ctfassets.net/clixtyxoaeas/4rnpEzy1ATWRKVBOLxZ1Fm/a74dc1eed36d23d7ea6030383a4d5163/MetaMask-icon-fox.svg"
          alt="MetaMask Logo"
          className={`w-6 h-6 ${loading ? "opacity-50" : ""}`}
        />
        {loading ? "Connecting..." : "Continue With MetaMask"}
      </motion.button>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
}
