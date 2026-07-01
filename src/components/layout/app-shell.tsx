"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import SiteFooter from "@/components/layout/footer";
import { SiteHeader } from "@/components/layout/header";
import { WhatsAppBubble } from "@/components/layout/whatsapp-bubble";

const AUTH_ROUTES = new Set(["/login", "/criar-conta"]);

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = pathname ? AUTH_ROUTES.has(pathname) : false;

  if (isAuthRoute) {
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
