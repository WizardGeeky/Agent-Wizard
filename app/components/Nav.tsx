"use client";

import React from "react";
import { motion } from "framer-motion";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export default function Nav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 flex justify-center backdrop-blur-sm"
    >
      <div className="w-11/12 lg:w-7/12 py-4 flex items-center justify-center">
        <motion.nav
          className="w-full px-6 py-3 lg:py-4 flex justify-between items-center rounded-full border border-border/50
                     bg-white/70 dark:bg-neutral-900/80
                     backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
          whileHover={{ scale: 1.005 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          {/* Brand Name */}
          <motion.div
            className="select-none text-xl text-pretty font-bold"
            whileHover={{ scale: 1.05 }}
          >
            Agent Wizard
          </motion.div>

          {/* Right Section */}
          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <AnimatedThemeToggler />
          </motion.div>
        </motion.nav>
      </div>
    </motion.header>
  );
}
