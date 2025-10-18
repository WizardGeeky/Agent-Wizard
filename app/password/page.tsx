"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const sendResetLink = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/v1/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message); // Show API message
        setEmail("");
      } else {
        setError(data.message); // Show API error message
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong"); // Fallback error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen justify-center items-center">
      <motion.form
        className="w-10/12 lg:w-3/12 lg:p-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Brand */}
        <div className="flex items-center justify-center w-full my-7">
          <h1 className="text-3xl font-bold text-center text-pretty">
            Agent Wizard
          </h1>
        </div>

        {/* Email Input */}
        <Input
          className="w-full my-3"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button
          className="w-full my-2"
          onClick={sendResetLink}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>

        {/* Feedback */}
        {message && <p className="text-green-500 mt-2 text-center">{message}</p>}
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

        <a href="/" className="my-5 text-pretty underline py-5 text-center">
          Login
        </a>
      </motion.form>
    </div>
  );
}
