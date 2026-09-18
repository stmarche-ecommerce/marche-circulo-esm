import type { Metadata } from "next";
import { PT_Sans } from "next/font/google";
import { AppShell } from "@/components/layout/app-shell";
import { ToastProvider } from "@/components/ui/toast-provider";
import "./globals.css";

const ptSans = PT_Sans({
  subsets: ["latin"],
  variable: "--font-pt-sans",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Santa Maria Empório",
    template: "%s | Santa Maria Empório",
  },
  description: "Landing page institucional do Santa Maria Empório em Next.js.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body id="top" className={`${ptSans.variable} min-h-screen bg-white text-[var(--color-body)]`}>
        <AppShell>{children}</AppShell>
        <ToastProvider />
      </body>
    </html>
  );
}