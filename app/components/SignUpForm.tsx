"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

export function SignUpForm() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (step === 1) {
        const res = await fetch("/api/v1/otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to send OTP");
        toast.success(data.message || "OTP sent!");
        setStep(2);
      } else if (step === 2) {
        const res = await fetch("/api/v1/otp/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Invalid OTP");
        toast.success("OTP verified!");
        setStep(3);
      } else if (step === 3) {
        const loginType = "web2";
        const res = await fetch("/api/v1/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, loginType }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Signup failed");
        toast.success("Account created successfully 🚀");
        // reset form
        setStep(1);
        setName("");
        setEmail("");
        setPassword("");
        setOtp("");
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form space-y-4 mt-4" onSubmit={handleNext}>
      {step === 1 && (
        <>
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full my-2" disabled={loading}>
            {loading ? "Sending..." : "Send OTP"}
          </Button>
        </>
      )}

      {step === 2 && (
        <>
          <div className="space-y-2">
            <Label>Enter OTP</Label>
            <Input
              type="text"
              placeholder="6-digit code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full my-2" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>
        </>
      )}

      {step === 3 && (
        <>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full my-2" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </>
      )}
    </form>
  );
}
