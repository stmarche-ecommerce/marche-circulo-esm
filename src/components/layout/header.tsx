"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, User, UserPlus, X } from "lucide-react";
import { primaryNavigationItems } from "@/lib/site-config";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function isActivePath(href: string) {
    return pathname === href || pathname?.startsWith(`${href}/`) === true;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-(--color-brown)/95 text-white backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-[44px_1fr_44px] items-center gap-2 px-4 py-4 sm:px-6 lg:px-8 xl:flex xl:justify-between xl:gap-0">
        {/* espaçador invisível — mesma largura do botão hamburguer, equilibra a grid */}
        <div className="xl:hidden" aria-hidden="true" />
        <Link
          href="/"
          className="shrink-0 justify-self-center xl:justify-self-auto"
          aria-label="Santa Maria Emporio - página inicial"
        >
          <Image
            src="/images/logo1.png"
            alt="Logo Empório Santa Maria"
            width={265}
            height={73}
            className="h-auto w-42 sm:w-48"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-5 text-xs font-semibold uppercase tracking-widest xl:flex 2xl:gap-8 2xl:text-sm 2xl:tracking-[0.12em]">
          {primaryNavigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActivePath(item.href) ? "page" : undefined}
              className={`transition ${isActivePath(item.href)
                ? "text-(--color-accent-soft)"
                : "text-white hover:text-(--color-accent-soft)"
                }`}
            >
              {item.label}
            </Link>
          ))}

          <section className="flex gap-8">
            <Link
              href="/criar-conta"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-(--color-accent) bg-(--color-accent)/12 px-5 text-xs font-semibold uppercase tracking-[0.16em] text-(--color-accent-soft) shadow-[0_0_0_1px_rgba(213,166,66,0.08)] hover:bg-(--color-accent) hover:text-(--color-brown-dark)"
            >
              <UserPlus size={15} strokeWidth={2.2} />
              Criar conta
            </Link>

            {/* <Link
              href="/login"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-(--color-accent)/20 bg-(--color-accent) px-5 text-xs font-semibold uppercase tracking-[0.16em] text-(--color-brown-dark) shadow-[0_0_0_1px_rgba(213,166,66,0.08)] hover:bg-(--color-accent-soft) hover:border-(--color-accent-soft)"
            >
              <User size={15} strokeWidth={2.2} />
              Login
            </Link> */}
          </section>
        </nav>

        <div className="hidden items-center border-l border-white/20 pl-6 xl:flex">
          <Link
            href="https://www.instagram.com/stamariaemporio/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="transition hover:text-(--color-accent-soft)"
          >
            <SocialIcon />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center justify-self-end rounded-full border border-white/15 xl:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-(--color-brown-dark) py-4 xl:hidden">
          <section className="w-full flex flex-col flex-wrap gap-2 px-4 mb-5 pb-5 border-b border-white/10">
            {/* <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-(--color-accent)/20 bg-(--color-accent) px-5 text-xs font-semibold uppercase tracking-[0.16em] text-(--color-brown-dark) shadow-[0_0_0_1px_rgba(213,166,66,0.08)] hover:bg-(--color-accent-soft) hover:border-(--color-accent-soft)"
            >
              <User size={15} strokeWidth={2.2} />
              Login
            </Link> */}

            <Link
              href="/criar-conta"
              onClick={() => setOpen(false)}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-(--color-accent) bg-(--color-accent)/12 px-5 text-xs font-semibold uppercase tracking-[0.16em] text-(--color-accent-soft) shadow-[0_0_0_1px_rgba(213,166,66,0.08)] hover:bg-(--color-accent) hover:text-(--color-brown-dark)"
            >
              <UserPlus size={15} strokeWidth={2.2} />
              Criar conta
            </Link>
          </section>

          <nav className="flex flex-col gap-4 px-4 text-sm font-semibold uppercase tracking-[0.12em]">
            {primaryNavigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActivePath(item.href) ? "page" : undefined}
                className={`transition ${isActivePath(item.href)
                  ? "text-(--color-accent-soft)"
                  : "text-white hover:text-(--color-accent-soft)"
                  }`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-5 flex items-center px-4 text-white/75">
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
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4.75 w-4.75 fill-none stroke-current" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.4" cy="6.6" r="1.1" className="fill-current stroke-none" />
    </svg>
  );
}

