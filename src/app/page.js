"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Login from "../components/Authentication/LogIn/LogIn";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; 

    if (!session) {
      router.replace("/login");
      return;
    }

    if (session?.user?.role === "manager") {
      router.replace("/general");
    } else if (session?.user?.role === "staff") {
      router.replace("/order");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <Login />;
  }

  return null;
}