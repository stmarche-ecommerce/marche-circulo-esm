import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  helperText: string;
  helperLinkHref: string;
  helperLinkLabel: string;
  children: ReactNode;
  centerPanelContent?: boolean;
};

export function AuthShell({
  eyebrow,
  title,
  description,
  helperText,
  helperLinkHref,
  helperLinkLabel,
  children,
  centerPanelContent = true,
}: AuthShellProps) {
  return (
    <section className="relative isolate bg-[#120f18] lg:grid lg:min-h-screen lg:grid-cols-[minmax(0,1.08fr)_minmax(0,42rem)]">
      <div className="relative min-h-[24rem] overflow-hidden lg:min-h-screen">
        <Image
          src="/images/loja.jpg"
          alt="Ambiente do Santa Maria Emporio"
          fill
          priority
          sizes="(min-width: 1024px) 52vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,15,24,0.08),rgba(18,15,24,0.68)),linear-gradient(135deg,rgba(47,44,82,0.28),rgba(104,64,49,0.22))]" />
        <div className="relative z-10 flex min-h-[24rem] flex-col justify-end p-[clamp(2rem,5vw,4rem)] text-left text-white lg:min-h-screen lg:justify-end">
          <p className="text-[0.78rem] font-bold uppercase tracking-[0.28em] text-white/72">Area Restrita</p>
          <h2 className="mt-4 max-w-[20rem] text-[clamp(2.3rem,4vw,4rem)] leading-[0.94] font-bold uppercase tracking-[0.08em]">
            Santa Maria Emporio
          </h2>
          <p className="mt-5 max-w-[28rem] text-base leading-[1.9] text-white/78">
            Acesse sua area exclusiva para acompanhar cadastros, beneficios e comunicacoes da plataforma.
          </p>
        </div>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col bg-[radial-gradient(circle_at_top,rgba(213,166,66,0.08),transparent_24%),linear-gradient(180deg,#fcfaf7_0%,#f3ece4_100%)] p-[clamp(1rem,2.5vw,2rem)] lg:min-h-screen lg:overflow-y-auto">
        <div className="mx-auto flex w-full max-w-[36rem] justify-end pb-4 lg:pb-6">
          <Link
            href="/"
            className="inline-flex text-[0.85rem] font-bold uppercase tracking-[0.18em] text-[var(--color-muted)] hover:text-[var(--color-brown)]"
          >
            Voltar ao site
          </Link>
        </div>

        <div
          className={`mx-auto flex w-full max-w-[36rem] flex-1 justify-center py-0 lg:py-4 ${centerPanelContent ? "items-center" : "items-start"
            }`}
        >
          <div className="w-full rounded-[2rem] border border-[rgba(104,64,49,0.12)] bg-[rgba(255,253,250,0.92)] p-[clamp(1.2rem,2vw,2rem)] shadow-[0_26px_80px_rgba(30,24,21,0.12)]">
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.28em] text-[var(--color-accent)]">{eyebrow}</p>
            <h1 className="mt-[0.55rem] text-[clamp(1.85rem,3vw,2.85rem)] leading-[0.94] font-bold uppercase tracking-[0.06em] text-[var(--color-brown)]">
              {title}
            </h1>
            <p className="mt-[0.65rem] text-[0.94rem] leading-[1.6] text-[var(--color-muted)]">{description}</p>

            {children}

            <p className="mt-[0.9rem] text-[0.9rem] text-[var(--color-muted)]">
              {helperText}{" "}
              <Link href={helperLinkHref} className="font-bold text-[var(--color-brown)] hover:text-[var(--color-accent)]">
                {helperLinkLabel}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
