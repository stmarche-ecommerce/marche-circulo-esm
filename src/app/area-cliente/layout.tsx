"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/sidebar";
import { AppClientProviders } from "@/components/ui/app-client-providers";
import { useAuth } from "@/app/context/auth-context";

function AreaClienteLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login?redirectTo=/area-cliente");
    }
  }, [loading, user, router]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(213,166,66,0.08),transparent_26%),linear-gradient(180deg,#fcfaf7_0%,#f4ede6_100%)] md:flex">
      <Sidebar userName={user?.name} />
      <main className="flex-1 p-5 md:p-8 xl:p-10">{children}</main>
    </div>
  );
}

export default function AreaClienteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppClientProviders>
      <AreaClienteLayoutContent>{children}</AreaClienteLayoutContent>
    </AppClientProviders>
  );
}