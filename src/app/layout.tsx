import type { Metadata } from "next";
import localFont from "next/font/local";
import { AppShell } from "@/components/layout/app-shell";
import { ToastProvider } from "@/components/ui/toast-provider";
import "./globals.css";

const cera = localFont({
  src: [
    { path: "../../public/fonts/CeraLight.ttf", weight: "300", style: "normal" },
    { path: "../../public/fonts/CeraBold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-cera",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Santa Maria Emporio",
    template: "%s | Santa Maria Emporio",
  },
  description: "Landing page institucional do Santa Maria Emporio em Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${cera.variable} min-h-screen bg-white text-[var(--color-body)]`}>
        <AppShell>{children}</AppShell>
        <ToastProvider />
      </body>
    </html>
  );
}
