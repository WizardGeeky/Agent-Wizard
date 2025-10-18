"use client";

import React from "react";
import { WobbleCard } from "@/components/ui/wobble-card";
import { Bell, ShieldCheck, BarChart3, Activity, Cpu, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function Features() {
  const features = [
    {
      title: "Real-Time Trade Monitoring",
      description:
        "Track live trades, market movements, and asset performance with instant data updates.",
      icon: <Activity className="h-6 w-6 text-pink-500 dark:text-pink-400" />,
      bg: "bg-pink-300 dark:bg-pink-400/70",
      iconBg: "bg-pink-500/10 dark:bg-pink-950/20",
    },
    {
      title: "Risk Analysis Engine",
      description:
        "AI-powered risk assessment to detect anomalies, volatility, and potential losses in advance.",
      icon: <ShieldCheck className="h-6 w-6 text-green-500 dark:text-green-400" />,
      bg: "bg-green-200 dark:bg-green-400/70",
      iconBg: "bg-green-500/10 dark:bg-green-950/20",
    },
    {
      title: "Telegram Notifications",
      description:
        "Get instant alerts for trades, risks, and important events directly on Telegram.",
      icon: <Bell className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />,
      bg: "bg-yellow-200 dark:bg-yellow-400/70",
      iconBg: "bg-yellow-500/10 dark:bg-yellow-950/20",
    },
    {
      title: "Advanced Analytics",
      description:
        "Visualize trade history, risk scores, and market trends with interactive dashboards.",
      icon: <BarChart3 className="h-6 w-6 text-blue-500 dark:text-blue-400" />,
      bg: "bg-blue-200 dark:bg-blue-400/70",
      iconBg: "bg-blue-500/10 dark:bg-blue-950/20",
    },
    {
      title: "Agent-Powered Workflows",
      description:
        "Automate monitoring, alerting, and decision-making with intelligent multi-agent systems.",
      icon: <Cpu className="h-6 w-6 text-purple-500 dark:text-purple-400" />,
      bg: "bg-purple-200 dark:bg-purple-400/70",
      iconBg: "bg-purple-500/10 dark:bg-purple-950/20",
    },
    {
      title: "Collaborative Insights",
      description:
        "Share insights with teams, set custom alerts, and collaborate in real-time for faster decisions.",
      icon: <Users className="h-6 w-6 text-red-500 dark:text-red-400" />,
      bg: "bg-red-200 dark:bg-red-400/70",
      iconBg: "bg-red-500/10 dark:bg-red-950/20",
    },
  ];

  return (
    <section className="w-full flex items-center justify-center py-12">
      <div className="w-11/12 lg:w-7/12 flex flex-col px-2 items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold py-4 text-center text-gray-900 dark:text-gray-100">
          Why Choose <span className="text-indigo-500 dark:text-indigo-400">Agent Wizard?</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full my-8 items-center justify-center">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <WobbleCard
                className={`
                  p-6 rounded-xl shadow-md 
                  hover:shadow-2xl hover:scale-105 transition-all duration-300
                  ${feature.bg}
                  dark:${feature.bg.split(" ")[1] || ""}
                `}
              >
                <div
                  className={`
                    flex items-center justify-center w-12 h-12 rounded-lg mb-4
                    ${feature.iconBg}
                  `}
                >
                  {feature.icon}
                </div>
                <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  {feature.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
              </WobbleCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
