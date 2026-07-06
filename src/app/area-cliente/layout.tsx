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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f3ec]">
        <p className="text-sm text-[#3d2b1f]/60">Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(213,166,66,0.08),transparent_26%),linear-gradient(180deg,#fcfaf7_0%,#f4ede6_100%)] md:flex">
      <Sidebar userName={user.name} />
      <main className="flex-1 p-5 md:p-8 xl:p-10">{children}</main>
    </div>
  );
}
