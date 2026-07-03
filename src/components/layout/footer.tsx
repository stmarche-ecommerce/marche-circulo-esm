"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronUp } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer
      className="relative overflow-hidden bg-[var(--color-brown-dark)] text-[var(--color-cream)]"
      style={{ backgroundImage: "linear-gradient(rgba(65, 36, 30, 0.9), rgba(65, 36, 30, 0.92)), url('/images/footer-bg.jpg')" }}
    >
      <div className="content-grid py-18">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr_0.85fr]">
          <div>
            <FooterTitle>SANTA MARIA EMPORIO</FooterTitle>
            <p className="mt-6 max-w-xl text-lg leading-9 text-[var(--color-cream-muted)]">
              Referencia da boa gastronomia, o Santa Maria Emporio oferece um ambiente agradavel para compras em Sao
              Paulo, com importados, padaria, rotisserie, confeitaria e um atendimento que valoriza cada detalhe.
            </p>
          </div>

          <div className="space-y-10">
            <div>
              <FooterTitle>DELIVERY</FooterTitle>
              <div className="mt-6">
                <FooterLink href="https://www.rappi.com.br/lojas/900631375-santa-maria-super-nc" external>
                  Compre pelo RAPPI
                </FooterLink>
              </div>
            </div>

            <div>
              <FooterTitle>UNIDADE</FooterTitle>
              <div className="mt-6 space-y-2 text-lg leading-8 text-[var(--color-cream-muted)]">
                <p>Av. Cidade Jardim, 790 - Jd. Paulistano</p>
                <p>Telefones: (11) 3706-5211 e (11) 3706-5210</p>
              </div>
            </div>

            <div>
              <FooterTitle>HORARIOS</FooterTitle>
              <div className="mt-6 space-y-2 text-lg leading-8 text-[var(--color-cream-muted)]">
                <p>Segunda a sabado das 8h as 22h</p>
                <p>Domingos e feriados das 8h as 21h</p>
              </div>
            </div>
          </div>

          <div>
            <FooterTitle>INSTITUCIONAL</FooterTitle>
            <div className="mt-6 flex flex-col gap-3 text-lg">
              <FooterLink href="/manifesto">Manifesto</FooterLink>
              <FooterLink href="/historia">Nossa Historia</FooterLink>
              <FooterLink href="https://campanha.marche.com.br/sustentabilidade/" external>
                Sustentabilidade
              </FooterLink>
              <FooterLink href="/trabalhe">Trabalhe conosco</FooterLink>
              <FooterLink href="/politica">Politica de Privacidade</FooterLink>
              <FooterLink href="/contato">Contato</FooterLink>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-8 border-t border-dashed border-white/25 pt-8 md:flex-row md:justify-between">
          <p className="max-w-2xl text-center text-sm leading-7 text-[var(--color-cream-muted)] md:text-left">
            Copyright 2025 - SANTA MARIA EMPORIO. Todos os direitos reservados. Razao Social HORTUS COMERCIO DE
            ALIMENTOS S.A. - CNPJ 09.000.493/0002-15
          </p>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex h-12 w-12 items-center justify-center border border-[var(--color-accent)] text-[var(--color-accent-soft)] transition hover:bg-[var(--color-accent)] hover:text-[var(--color-brown-dark)]"
            aria-label="Voltar ao topo"
          >
            <ChevronUp size={18} />
          </button>

          <div className="flex items-center gap-5 text-[var(--color-cream-muted)]">
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
        </div>
      </div>
    </footer>
  );
}

function FooterTitle({ children }: { children: ReactNode }) {
  return (
    <div>
      <h3 className="text-xl font-semibold uppercase tracking-[0.18em] text-white">{children}</h3>
      <div className="mt-4 h-[3px] w-11 bg-[var(--color-accent)]" />
    </div>
  );
}

function FooterLink({
  children,
  href,
  external,
}: {
  children: ReactNode;
  href: string;
  external?: boolean;
}) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="transition hover:text-[var(--color-accent-soft)]">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className="transition hover:text-[var(--color-accent-soft)]">
      {children}
    </Link>
  );
}

function SocialIcon({ kind }: { kind: "facebook" | "instagram" }) {
  if (kind === "facebook") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[21px] w-[21px] fill-current">
        <path d="M13.5 21v-7h2.3l.4-3h-2.7V9.2c0-.9.3-1.5 1.6-1.5H16V5.1c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5V11H8v3h2.6v7h2.9Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[21px] w-[21px] fill-none stroke-current" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.4" cy="6.6" r="1.1" className="fill-current stroke-none" />
    </svg>
  );
}
