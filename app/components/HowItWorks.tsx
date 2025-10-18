"use client";

import React from "react";
import {
  CloudArrowUpIcon,
  ChartBarIcon,
  BellAlertIcon,
  ArrowDownOnSquareIcon,
} from "@heroicons/react/24/outline";

const steps = [
  {
    step: "Step 1",
    title: "Subscribe to Wizard Agent",
    description:
      "Start by subscribing to Wizard Agent to unlock trading tools and personalized dashboards.",
    icon: CloudArrowUpIcon,
  },
  {
    step: "Step 2",
    title: "Access Dashboard",
    description:
      "Monitor trades, track performance, and manage your portfolio from a centralized dashboard.",
    icon: ChartBarIcon,
  },
  {
    step: "Step 3",
    title: "Enable Risk Analysis & Alerts",
    description:
      "Turn on smart alerts and risk analysis to stay ahead and protect your investments.",
    icon: BellAlertIcon,
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full flex items-center lg:py-10 justify-center h-auto">
      <div className="w-11/12 lg:w-7/12 px-2 my-10">
        <div className="text-center mb-12">
          <p className="mt-2 text-3xl font-extrabold sm:text-4xl">
            How Our Agent Wizard Works
          </p>
          <p className="mt-2 text-lg">
            Follow these simple steps to get started and optimize your trading
            workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="shadow rounded-lg p-6 card flex flex-col items-center border-2 text-center hover:scale-105 transition-transform"
            >
              <div className=" p-4 rounded-full mb-4">
                <step.icon className="h-8 w-8 " />
              </div>
              <h3 className="text-sm font-semibold mb-1">{step.step}</h3>
              <h4 className="text-xl font-bold  mb-2">{step.title}</h4>
              <p className="">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
