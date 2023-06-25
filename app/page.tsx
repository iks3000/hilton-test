"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const MyApp: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [router]);

  return null;
};

export default MyApp;
