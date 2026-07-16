"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn, Menu, X } from "lucide-react";
import { useState } from "react";

import { primaryNavigationItems } from "@/lib/site-config";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function isActivePath(href: string) {
    return pathname === href || pathname?.startsWith(`${href}/`) === true;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--color-brown)]/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0" aria-label="Santa Maria Emporio - pagina inicial">
          <Image
            src="/images/logo1.png"
            alt="Santa Maria Emporio"
            width={265}
            height={73}
            className="h-auto w-[10.5rem] sm:w-[12rem]"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-5 text-xs font-semibold uppercase tracking-[0.1em] xl:flex 2xl:gap-8 2xl:text-sm 2xl:tracking-[0.12em]">
          {primaryNavigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActivePath(item.href) ? "page" : undefined}
              className={`transition ${isActivePath(item.href)
                ? "text-[var(--color-accent-soft)]"
                : "text-white hover:text-[var(--color-accent-soft)]"
                }`}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/login"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[var(--color-accent)] bg-[var(--color-accent)]/12 px-5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-soft)] shadow-[0_0_0_1px_rgba(213,166,66,0.08)] hover:bg-[var(--color-accent)] hover:text-[var(--color-brown-dark)]"
          >
            <LogIn size={15} strokeWidth={2.2} />
            Login
          </Link>
        </nav>

        <div className="hidden items-center border-l border-white/20 pl-6 xl:flex">
          <Link
            href="https://www.instagram.com/stamariaemporio/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="transition hover:text-[var(--color-accent-soft)]"
          >
            <SocialIcon />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 xl:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-[var(--color-brown-dark)] px-4 py-4 xl:hidden">
          <div className="mb-5">
            <Link
              href="/login"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[var(--color-accent)] bg-[var(--color-accent)]/12 px-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-soft)] shadow-[0_0_0_1px_rgba(213,166,66,0.08)] hover:bg-[var(--color-accent)] hover:text-[var(--color-brown-dark)]"
              onClick={() => setOpen(false)}
            >
              <LogIn size={15} strokeWidth={2.2} />
              Login
            </Link>
          </div>

          <nav className="flex flex-col gap-4 text-sm font-semibold uppercase tracking-[0.12em]">
            {primaryNavigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActivePath(item.href) ? "page" : undefined}
                className={`transition ${isActivePath(item.href)
                  ? "text-[var(--color-accent-soft)]"
                  : "text-white hover:text-[var(--color-accent-soft)]"
                  }`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-5 flex items-center text-white/75">
            <Link
              href="https://www.instagram.com/stamariaemporio/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <SocialIcon />
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function SocialIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[19px] w-[19px] fill-none stroke-current" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.4" cy="6.6" r="1.1" className="fill-current stroke-none" />
    </svg>
  );
}

