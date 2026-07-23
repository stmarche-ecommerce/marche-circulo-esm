"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/sidebar";
import { useAuth } from "@/app/context/auth-context";

export default function AreaClienteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login?redirectTo=/area-cliente");
    }
  }, [loading, user, router]);

  return (
    <div className="min-h-screen bg-[#f7f1e6] min-[901px]:flex">
      <Sidebar userName={user?.name} />
      {children}
    </div>
  );
}
