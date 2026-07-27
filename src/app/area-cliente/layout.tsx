"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/sidebar";
import { WhatsAppAssistant } from "@/components/layout/whatsapp-assistant";
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
    <div className="min-h-screen bg-[#f6efe4] md:flex">
      <Sidebar userName={user?.name} userEmail={user?.email} />
      {children}
      <WhatsAppAssistant />
    </div>
  );
}
