"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/sidebar";
import { WhatsAppAssistant } from "@/components/layout/whatsapp-assistant";
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
    <div className="min-h-screen bg-[#f6efe4] md:flex">
      <Sidebar userName={user?.name} userEmail={user?.email} />
      {children}
      <WhatsAppAssistant />
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
