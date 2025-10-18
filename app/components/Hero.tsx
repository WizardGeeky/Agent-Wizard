"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { BiSolidBellRing } from "react-icons/bi";
import { BsRobot } from "react-icons/bs";
import {
  FaTelegramPlane,
  FaWhatsapp,
  FaTwitter,
  FaDiscord,
} from "react-icons/fa";
import { AuroraText } from "@/components/ui/aurora-text";
import { Ripple } from "@/components/ui/ripple";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SignUpForm } from "./SignUpForm";
import { LoginForm } from "./LoginForm";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { decodeToken } from "../config/jwt.config";
import Metamask from "./Metamask";
import Agent from "./Agent";

export default function Hero() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("userId");

    if (token) {
      try {
        const decoded = decodeToken(token);
        if (decoded) {
          router.push("/dashboard");
        } else {
          localStorage.removeItem("userId");
        }
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("userId");
      }
    }
  }, [router]);

  return (
    <>
      <section className="w-full flex items-center py-0 lg:py-10 justify-center h-auto">
        <div className="w-11/12 lg:w-7/12 px-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full my-32">
            {/* Left side */}
            <motion.div
              className="flex flex-col items-center lg:items-start justify-center text-center lg:text-left order-2 lg:order-1 space-y-4 lg:space-y-8"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-semibold">Hey Hi 👋, I am </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <AuroraText>
                  Agent <span className="text-primary">Wizard</span>
                </AuroraText>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl">
                Agent Wizard monitors{" "}
                <span className="text-primary font-semibold">
                  Web3 trades in real-time
                </span>
                , analyzes market activity, and delivers{" "}
                <span className="font-semibold">instant notifications</span> so
                you never miss the{" "}
                <span className="text-primary font-semibold">
                  best time to trade.
                </span>
              </p>

              {/* ShadCN Modal Trigger */}
              <Dialog>
                <DialogTrigger asChild>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex items-center justify-center gap-2 px-10 py-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-2xl focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 lg:my-10"
                  >
                    <BiSolidBellRing className="text-lg" />
                    Get Started
                  </motion.button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader className="my-2">
                    <DialogTitle>Welcome</DialogTitle>
                    <DialogDescription className="py-1">
                      Sign in or create an account to continue 🚀
                    </DialogDescription>
                  </DialogHeader>

                  <Metamask />
                  <div className="flex items-center my-1">
                    <div className="flex-1 h-px bg-gray-300" />
                    <span className="px-4 text-gray-500 font-medium">or</span>
                    <div className="flex-1 h-px bg-gray-300" />
                  </div>
                  {/* Tabs for Sign In / Sign Up */}
                  <Tabs defaultValue="signin" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="signin">Sign In</TabsTrigger>
                      <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>

                    <TabsContent value="signin">
                      <LoginForm />
                    </TabsContent>

                    <TabsContent value="signup">
                      <SignUpForm />
                    </TabsContent>
                  </Tabs>
                <a href="/password" className="text text-pretty text-red-500 underline">Forgot or Reset Password</a>

                </DialogContent>


              </Dialog>
            </motion.div>

            {/* Right side */}
            <motion.div
              className="flex items-center justify-center lg:justify-end order-1 lg:order-2 relative"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative flex items-center justify-center w-full h-full p-20 lg:p-0">
                <Ripple className="absolute inset-0" />

                {/* Orbit Wrapper */}
                <motion.div
                  className="absolute w-40 h-40 sm:w-56 sm:h-56 flex items-center justify-center pointer-events-none"
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 20,
                    ease: "linear",
                  }}
                >
                  <div className="absolute top-0">
                    <FaTelegramPlane className="text-blue-400 text-2xl sm:text-3xl" />
                  </div>
                  <div className="absolute right-0">
                    <FaWhatsapp className="text-green-500 text-2xl sm:text-3xl" />
                  </div>
                  <div className="absolute bottom-0">
                    <FaDiscord className="text-indigo-500 text-2xl sm:text-3xl" />
                  </div>
                  <div className="absolute left-0">
                    <FaTwitter className="text-sky-400 text-2xl sm:text-3xl" />
                  </div>
                </motion.div>

                {/* Robot in Center */}
                <BsRobot className="text-pretty text-7xl relative z-10" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <div className="fixed bottom-6 right-6 z-50 ">
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center justify-center w-10 h-10 lg:w-16 lg:h-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
              <BsRobot className="text-2xl" />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
              <DialogTitle>Chat With Agent Wizard</DialogTitle>
            <Agent />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
