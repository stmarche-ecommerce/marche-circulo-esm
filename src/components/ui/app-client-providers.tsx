"use client";

import type { ReactNode } from "react";

import { AuthProvider } from "@/app/context/auth-context";
import { ToastProvider } from "@/components/ui/toast-provider";

export function AppClientProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <ToastProvider />
    </AuthProvider>
  );
}