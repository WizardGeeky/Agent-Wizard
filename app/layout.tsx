import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import startRiskCron from "./lib/cron";
import { ThemeProvider } from "./contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

if (typeof window === "undefined" && !(globalThis as any).__riskCronStarted) {
  startRiskCron();
  (globalThis as any).__riskCronStarted = true;
}

export const metadata: Metadata = {
  title: "Agent Wizard | Web3 trade monitoring and risk analysis tool",
  description: "Developed By Eswar - @WizardGeeky",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
