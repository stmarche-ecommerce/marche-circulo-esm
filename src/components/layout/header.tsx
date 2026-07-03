"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn, Menu, X } from "lucide-react";
import { useState } from "react";
import { navigationItems } from "@/lib/site-config";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function isActivePath(slug: string) {
    const href = `/${slug}`;
    return pathname === href || pathname?.startsWith(`${href}/`) === true;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--color-brown)]/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link href="/" className="shrink-0 tracking-[0.38em] text-white">
            <span className="block text-[1.7rem] font-light uppercase leading-none">Santa Maria</span>
            <span className="mt-1 block text-[0.82rem] font-medium uppercase tracking-[0.48em] text-white/75">
              Emporio
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-semibold uppercase tracking-[0.12em] lg:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.slug}
              href={`/${item.slug}`}
              aria-current={isActivePath(item.slug) ? "page" : undefined}
              className={`transition ${isActivePath(item.slug)
                ? "text-[var(--color-accent-soft)]"
                : "text-white hover:text-[var(--color-accent-soft)]"
                }`}
            >
              {item.navLabel}
            </Link>
          ))}

          <Link
            href="/login"
            className="inline-flex w-[130px] min-h-11 items-center justify-center gap-2 rounded-full border border-[var(--color-accent)] bg-[var(--color-accent)]/12 px-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-soft)] shadow-[0_0_0_1px_rgba(213,166,66,0.08)] hover:bg-[var(--color-accent)] hover:text-[var(--color-brown-dark)]"
          >
            <LogIn size={15} strokeWidth={2.2} />
            Área Restrita
          </Link>

        </nav>

        <div className="hidden items-center gap-4 border-l border-white/20 pl-6 lg:flex">
          <Link
            href="https://www.facebook.com/profile.php?id=61568774857483"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="transition hover:text-[var(--color-accent-soft)]"
          >
            <SocialIcon kind="facebook" />
          </Link>
          <Link
            href="https://www.instagram.com/stamariaemporio/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="transition hover:text-[var(--color-accent-soft)]"
          >
            <SocialIcon kind="instagram" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 lg:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-[var(--color-brown-dark)] px-4 py-4 lg:hidden">
          <div className="mb-5">
            <Link
              href="/login"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[var(--color-accent)] bg-[var(--color-accent)]/12 px-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-soft)] shadow-[0_0_0_1px_rgba(213,166,66,0.08)] hover:bg-[var(--color-accent)] hover:text-[var(--color-brown-dark)]"
              onClick={() => setOpen(false)}
            >
              <LogIn size={15} strokeWidth={2.2} />
              Ir para login
            </Link>
          </div>

          <nav className="flex flex-col gap-4 text-sm font-semibold uppercase tracking-[0.12em]">
            {navigationItems.map((item) => (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                aria-current={isActivePath(item.slug) ? "page" : undefined}
                className={`transition ${isActivePath(item.slug)
                  ? "text-[var(--color-accent-soft)]"
                  : "text-white hover:text-[var(--color-accent-soft)]"
                  }`}
                onClick={() => setOpen(false)}
              >
                {item.navLabel}
              </Link>
            ))}
          </nav>
          <div className="mt-5 flex items-center gap-4 text-white/75">
            <Link
              href="https://www.facebook.com/profile.php?id=61568774857483"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <SocialIcon kind="facebook" />
            </Link>
            <a href="https://www.instagram.com/stamariaemporio/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <SocialIcon kind="instagram" />
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function SocialIcon({ kind }: { kind: "facebook" | "instagram" }) {
  if (kind === "facebook") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[19px] w-[19px] fill-current">
        <path d="M13.5 21v-7h2.3l.4-3h-2.7V9.2c0-.9.3-1.5 1.6-1.5H16V5.1c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5V11H8v3h2.6v7h2.9Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[19px] w-[19px] fill-none stroke-current" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.4" cy="6.6" r="1.1" className="fill-current stroke-none" />
    </svg>
  );
}
