"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { decodeToken } from "@/app/config/jwt.config";


export default function ProfileView() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
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

        const res = await fetch("/api/v1/assets/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        setUser(data?.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user found</p>;

  return (
    <div className="space-y-3">
      <h1 className="text-pretty">Profile</h1>
      {user.loginType === "web2" && <div className="">
      </div>}

      {user.loginType === "web3" && <div className="">
      </div>}
    </div>
  );
}
