"use client";

import React, { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import DashboardView from "./components/dashboard";
import LogoutView from "./components/logout";
import RiskAnalysisEngine from "./components/riskanalysisengine";
import Analytics from "./components/Analytics";

import { IoLogOutSharp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { BsRobot } from "react-icons/bs";
import { AiOutlineBarChart } from "react-icons/ai";
import { GrRisk } from "react-icons/gr";

import { useRouter } from "next/navigation";
import { decodeToken } from "../config/jwt.config";
import { LoaderOne } from "@/components/ui/loader";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");

  useEffect(() => {
    const token = localStorage.getItem("userId");
    if (!token) {
      router.push("/");
      return;
    }

    const decoded = decodeToken(token);
    if (!decoded) {
      localStorage.removeItem("userId");
      router.push("/");
      return;
    }

    setLoading(false);
  }, [router]);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <MdDashboard size={18} /> },
    {
      id: "analytics",
      label: "Analytics",
      icon: <AiOutlineBarChart size={18} />,
    },
    { id: "risk", label: "Risk Configuration", icon: <GrRisk size={18} /> },
  ];

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardView />;
      case "analytics":
        return <Analytics />;
      case "risk":
        return <RiskAnalysisEngine />;
      case "logout":
        return <LogoutView />;
      default:
        return <DashboardView />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-white dark:bg-gray-900">
        <LoaderOne />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Sidebar for large screens */}
      <aside className="hidden lg:flex lg:flex-col w-64 lg:w-72 p-6 border-r-2 bg-white dark:bg-gray-900">
        <nav className="flex flex-col h-full">
          <div className="flex flex-col gap-2 flex-1">
            <div>
              <span className="flex items-center gap-2 text-xl font-semibold mb-6">
                Agent Wizard
              </span>
            </div>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors
                  ${
                    activeView === item.id
                      ? "bg-gray-200 dark:bg-gray-700 font-semibold"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </div>

          <div className="mt-auto">
            <button
              className="w-full bg-red-500 hover:bg-red-600 transition-colors font-medium text-white py-2 rounded-md flex items-center justify-center gap-2"
              onClick={() => setActiveView("logout")}
            >
              <IoLogOutSharp size={18} /> Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-30 lg:hidden transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="absolute inset-0 bg-black bg-opacity-40"
          onClick={() => setSidebarOpen(false)}
        />
        <aside className="relative w-64 h-full bg-white dark:bg-gray-900 p-6 flex flex-col z-40">
          <nav className="flex flex-col h-full">
            <div className="flex flex-col gap-2 flex-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors
                    ${
                      activeView === item.id
                        ? "bg-gray-200 dark:bg-gray-700 font-semibold"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                >
                  {item.icon} {item.label}
                </button>
              ))}
            </div>

            <div className="mt-auto">
              <button
                className="w-full bg-red-500 hover:bg-red-600 transition-colors font-medium text-white py-2 rounded-md flex items-center justify-center gap-2"
                onClick={() => {
                  setActiveView("logout");
                  setSidebarOpen(false);
                }}
              >
                <IoLogOutSharp size={18} /> Logout
              </button>
            </div>
          </nav>
        </aside>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="w-full flex items-center justify-between px-4 py-4 lg:py-6 lg:px-6 border-b-2 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="flex items-center gap-2 text-lg font-bold">
            <span className="flex items-center gap-2 text-lg font-bold lg:hidden">
              <BsRobot className="text-2xl" /> Agent Wizard
            </span>
          </div>
          <div className="flex items-center gap-2">
            <AnimatedThemeToggler />
            <button
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu size={24} />
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-auto">{renderView()}</main>
      </div>
    </div>
  );
}
