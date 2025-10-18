"use client";

import React, { useState, useEffect, useRef } from "react";
import { BsRobot } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Agent() {
  const [messages, setMessages] = useState<
    { sender: "user" | "ai"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Handle message send
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/v1/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      const aiResponse = data.reply || "⚠️ No response received.";

      setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "⚠️ Something went wrong." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const hasStarted = messages.length > 0;

  return (
    <div
      className={`flex flex-col h-[400px] sm:h-[500px] transition-colors duration-300
        bg-white dark:bg-[#0f172a] border-gray-200 dark:border-gray-700`}
    >
      {/* Intro screen when chat is empty */}
      {!hasStarted ? (
        <div className="flex flex-1 items-center justify-center flex-col text-center p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-4"
          >
            <BsRobot className="text-xl lg:text-5xl" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Welcome to <span className="text-blue-600">Agent Wizard</span>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
              Ask about <strong>Web3 trading</strong>,{" "}
              <strong>cryptocurrencies</strong>, or{" "}
              <strong>global stocks</strong>.
            </p>
          </motion.div>
        </div>
      ) : (
        <>
          {/* Chat area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex items-start gap-2 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "ai" && (
                  <BsRobot className="text-blue-500 text-xl mt-1" />
                )}
                <div
                  className={`px-4 py-2 rounded-2xl max-w-[80%] text-sm sm:text-base whitespace-pre-wrap
                    ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 dark:bg-gray-800 text-black dark:text-gray-100"
                    }`}
                >
                  {msg.text}
                </div>
                {msg.sender === "user" && (
                  <FaUserCircle className="text-gray-500 dark:text-gray-400 text-xl mt-1" />
                )}
              </motion.div>
            ))}

            {/* Typing indicator */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm"
                >
                  <BsRobot className="text-blue-500 animate-bounce" />
                  <span>Agent Wizard is thinking...</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={chatEndRef} />
          </div>
        </>
      )}

      {/* Input area */}
      <div
        className={`flex gap-2 p-3 border-t transition-colors duration-300
        border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-b-xl`}
      >
        <input
          type="text"
          placeholder="Ask Agent Wizard..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 px-3 py-2 rounded-lg text-sm sm:text-base
            bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 
            text-gray-800 dark:text-gray-100 
            focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className={`px-4 py-2 rounded-lg font-medium text-white transition
            ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}

