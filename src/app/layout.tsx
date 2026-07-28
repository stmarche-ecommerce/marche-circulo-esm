import type { Metadata } from "next";
import localFont from "next/font/local";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { AppShell } from "@/components/layout/app-shell";
import "./globals.css";

const cera = localFont({
  src: [
    { path: "../../public/fonts/CeraLight.ttf", weight: "300", style: "normal" },
    { path: "../../public/fonts/CeraBold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-cera",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
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
      <body id="top" className={`${cera.variable} ${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} min-h-screen bg-white text-[var(--color-body)]`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
