"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import SiteFooter from "@/components/layout/footer";
import { SiteHeader } from "@/components/layout/header";
import { WhatsAppBubble } from "@/components/layout/whatsapp-bubble";

const STANDALONE_ROUTES = new Set(["/login", "/criar-conta", "/recuperar-senha"]);

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isStandaloneRoute = pathname
    ? STANDALONE_ROUTES.has(pathname) || pathname.startsWith("/area-cliente")
    : false;

  if (isStandaloneRoute) {
    return children;
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-[60vh]">{children}</main>
      <SiteFooter />
      <WhatsAppBubble />
    </>
  );
}
