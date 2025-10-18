"use client"

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const emailParam = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const resetPassword = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/v1/password/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailParam, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setPassword("");
        setConfirmPassword("");

        setTimeout(() => router.push("/"), 2000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen justify-center items-center">
      <div className="w-10/12 lg:w-3/12 p-10 border rounded-md">
        <h2 className="text-2xl font-bold mb-5 text-center">Reset Password</h2>

        <Input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3"
        />

        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mb-3"
        />

        <Button
          className="w-full mb-2"
          onClick={resetPassword}
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </Button>

        {message && <p className="text-green-500 text-center">{message}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
}

export default function PasswordResetLink() {
  return (
    <Suspense fallback={<p className="text-gray-500">Loading...</p>}>
      <ResetPasswordPage />
    </Suspense>
  );
}
