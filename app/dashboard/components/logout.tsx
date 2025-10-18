"use client";
import React from "react";

import { LoaderFive } from "@/components/ui/loader";
import { useRouter } from "next/navigation";

export default function LogoutView() {
  const router = useRouter();
  React.useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);
  localStorage.removeItem("userId");

  return (
    <div className="flex w-full items-center justify-center h-[70vh]">
      <LoaderFive text="Logging out..." />
    </div>
  );
}
