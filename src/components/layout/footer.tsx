import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronUp } from "lucide-react";

export default function SiteFooter() {
  const data = new Date();
  const anoAtual = data.getFullYear();

  return (
    <footer
      className="relative overflow-hidden bg-[var(--color-brown-dark)] text-[var(--color-cream)]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(65, 36, 30, 0.9), rgba(65, 36, 30, 0.92)), url('/images/footer-bg.jpg')",
      }}
    >
      <div className="content-grid py-18">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr_0.85fr]">
          <div>
            <FooterTitle>SANTA MARIA EMPÓRIO</FooterTitle>
            <p className="mt-6 max-w-xl text-lg leading-9 text-[var(--color-cream-muted)]">
              Referência da boa gastronomia, o Santa Maria Empório oferece um ambiente agradável para compras em São
              Paulo. Um lugar único que reúne, com harmonia e satisfação, uma vasta gama de produtos especiais,
              importados, além de uma padaria, rotisserie e confeitaria com produtos frescos de fabricação própria,
              sempre preparados com os melhores ingredientes. Contamos ainda com um sushi renomado, entre os melhores
              de São Paulo, uma cafeteria especial e uma fábrica de massas artesanais. Qualidade e atendimento são
              nossos diferenciais. Tudo isso para que você viva sua paixão por excelência, todos os dias.
            </p>
          </div>

          <div className="space-y-10">
            <div>
              <FooterTitle>DELIVERY</FooterTitle>
              <div className="mt-6 flex flex-col gap-3 text-lg">
                <FooterLink href="https://www.rappi.com.br/lojas/900631375-santa-maria-super-nc" external>
                  Rappi
                </FooterLink>
                <FooterLink href="https://www.ifood.com.br" external>
                  iFood
                </FooterLink>
                <FooterLink href="https://wa.me/5511958187139" external>
                  Loja própia
                </FooterLink>
              </div>
            </div>

            <div>
              <FooterTitle>ENDEREÇO</FooterTitle>
              <div className="mt-6 space-y-2 text-lg leading-8 text-[var(--color-cream-muted)]">
                <p>Av. Cidade Jardim, 790 - Jd. Paulistano</p>
                <p>Telefones: (11) 3706-5211 e (11) 3706-5210</p>
              </div>
            </div>

            <div>
              <FooterTitle>HORÁRIOS</FooterTitle>
              <div className="mt-6 space-y-2 text-lg leading-8 text-[var(--color-cream-muted)]">
                <p>Segunda à sábado das 8h às 22h</p>
                <p>Domingos e feriados das 8h às 21h</p>
              </div>
            </div>
          </div>

          <div>
            <FooterTitle>INSTITUCIONAL</FooterTitle>
            <div className="mt-6 flex flex-col gap-3 text-lg">
              <FooterLink href="/manifesto">Manifesto</FooterLink>
              <FooterLink href="/historia">Nossa História</FooterLink>
              <FooterLink href="https://pages.marche.com.br/sustentabilidade/" external>
                Sustentabilidade
              </FooterLink>
              <FooterLink href="https://stmarche.gupy.io/" external>
                Trabalhe conosco
              </FooterLink>
              <FooterLink href="/politica">Política de Privacidade</FooterLink>
              <FooterLink href="/contato">Contato</FooterLink>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-8 border-t border-dashed border-white/25 pt-8 md:flex-row md:justify-between">
          <p className="max-w-2xl text-center text-sm leading-7 text-[var(--color-cream-muted)] md:text-left">
            Copyright {anoAtual} - SANTA MARIA EMPÓRIO. Todos os direitos reservados. Razão Social HORTUS COMERCIO DE
            ALIMENTOS S.A. - CNPJ 09.000.493/0002-15
          </p>

          <a
            href="#top"
            className="inline-flex h-12 w-12 items-center justify-center border border-[var(--color-accent)] text-[var(--color-accent-soft)] transition hover:bg-[var(--color-accent)] hover:text-[var(--color-brown-dark)]"
            aria-label="Voltar ao topo"
          >
            <ChevronUp size={18} />
          </a>

          <div className="flex items-center text-[var(--color-cream-muted)]">
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

function SocialIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[21px] w-[21px] fill-none stroke-current" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.4" cy="6.6" r="1.1" className="fill-current stroke-none" />
    </svg>
  );
}
