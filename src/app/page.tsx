import Link from "next/link";
import Image from "next/image";

import { HeroCarousel } from "@/components/ui/hero-carousel";

const experienceCards = [
  {
    title: "Empório",
    description:
      "Referência em curadoria e gastronomia em São Paulo, com padaria, rotisserie, confeitaria, hortifrúti, adega, mercearia e produtos importados selecionados com atenção e afeto.",
    href: "/emporio",
    image: "/images/emporio.jpg",
  },
  {
    title: "Sushi",
    description:
      "Um dos melhores sushi bars de São Paulo, comandado pelo Chef Marcelo Kunigami, com peixes frescos de alta qualidade e ingredientes selecionados a dedo.",
    href: "/sushi",
    image: "/images/foto1.jpg",
  },
  {
    title: "Café",
    description:
      "Bebidas quentes e frias, refeições leves ou mais elaboradas com o toque de afeto do Santa Maria para transformar qualquer pausa em um momento especial.",
    href: "/cafe",
    image: "/images/foto3.jpg",
  },
  {
    title: "Brunch",
    description:
      "Pães artesanais, ovos na hora, frutas frescas e panquecas douradas, todos os finais de semana a partir das 9h para transformar o café da manhã em celebração.",
    href: "/brunch",
    image: "/images/branch1.jpg",
  },
  {
    title: "Curadoria",
    description:
      "Conteúdos, histórias e referências para ampliar o repertório gastronômico e descobrir novos prazeres do dia a dia.",
    href: "/curadoria",
    image: "/images/curadoria1.png",
  },
  {
    title: "Nossos Serviços",
    description:
      "Encomendas, personal shopper, eventos e cestas personalizadas: soluções sob medida com toda a solidez gastronômica do Santa Maria.",
    href: "/servicos",
    image: "/images/servicos.jpg",
  },
];

const workHighlights = ["Grupo St Marche", "Ambiente acolhedor", "Novas oportunidades"];

export default function HomePage() {
  return (
    <>
      <HeroCarousel />

      <section className="section-shell bg-[var(--color-brown-dark)] text-white">
        <div className="content-grid max-w-5xl text-center">
          <h2 className="mb-2 text-3xl font-semibold md:text-5xl">Viva a sua paixão por excelência!</h2>
          <p className="mx-auto max-w-4xl text-lg leading-8 text-white/82 md:text-xl">
            O Santa Maria é referência em gastronomia em São Paulo e conta com padaria, rotisserie, confeitaria, sushi, café e fábrica de massas. Tudo feito com os melhores ingredientes, qualidade e atendimento únicos!
          </p>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="content-grid">
          <div className="mb-10 max-w-4xl">
            <p className="section-eyebrow">Santa Maria Empório</p>
            <h2 className="section-title">Viva a sua paixão por excelência</h2>
            <p className="mt-5 text-lg leading-8 text-[var(--color-muted)]">
              O Santa Maria é referência em gastronomia em São Paulo e conta com padaria, rotisserie, confeitaria,
              sushi, café e fábrica de massas. Tudo feito com os melhores ingredientes, qualidade e atendimento únicos.
            </p>
          </div>

          <div className="card-grid xl:grid-cols-4">
            {experienceCards.map((card) => (
              <Link key={card.title} href={card.href} className="site-card overflow-hidden">
                <div className="card-grid__image">
                  <Image src={card.image} alt={card.title} fill sizes="(min-width: 1280px) 23vw, (min-width: 768px) 45vw, 92vw" className="object-cover transition duration-500 hover:scale-105" />
                </div>
                <div className="card-grid__body">
                  <h3 className="card-grid__title">{card.title}</h3>
                  <p className="card-grid__description">{card.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(218,168,54,0.18),_transparent_38%),linear-gradient(180deg,_#f6efe6_0%,_#f7f1e8_100%)]">
        <div className="content-grid">
          <article className="site-card relative overflow-hidden border border-white/70 bg-white/92 p-0 shadow-[0_24px_80px_rgba(113,74,42,0.14)] backdrop-blur">
            <div className="absolute inset-y-0 left-0 hidden w-2 bg-[var(--color-accent)] lg:block" />
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              <div className="p-8 md:p-10 lg:p-14">
                <p className="section-eyebrow">Institucional</p>
                <h2 className="section-title !text-3xl md:!text-5xl">Trabalhe conosco</h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-muted)] md:text-xl">
                  Confira as oportunidades abertas no grupo St Marche e encontre a vaga ideal para o seu próximo passo em um ambiente que valoriza atendimento, excelência e paixão pelo detalhe.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {workHighlights.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[var(--color-accent)]/35 bg-[var(--color-accent)]/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-brown-dark)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <a href="https://stmarche.gupy.io/" target="_blank" rel="noreferrer" className="site-button inline-flex min-w-[250px] justify-center whitespace-nowrap px-7 py-4 text-sm tracking-[0.18em]">
                    Ver oportunidades
                  </a>
                  <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    Novas vagas e trilhas de crescimento
                  </p>
                </div>
              </div>

              <div className="relative min-h-[280px] overflow-hidden lg:min-h-full">
                <Image
                  src="/images/nossa-loja.jpg"
                  alt="Ambiente do Santa Maria Empório"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(65,36,30,0.72)] via-[rgba(65,36,30,0.24)] to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="max-w-sm rounded-[28px] border border-white/20 bg-[rgba(65,36,30,0.58)] p-5 text-white backdrop-blur-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-soft)]">
                      Faça parte
                    </p>
                    <p className="mt-3 text-lg leading-7 text-white/90">
                      Uma equipe movida por hospitalidade, curadoria e experiências que deixam memória.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}