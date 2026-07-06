'use client'

import Link from "next/link";
import Image from "next/image";
import { HeroCarousel } from "@/components/ui/hero-carousel";

const homeCards = [
  {
    title: "Brunch",
    description: "Um novo espaco para celebrar a manhã, todos os dias a partir das 9h.",
    href: "/brunch",
    image: "/images/branch1.jpg",
  },
  {
    title: "Emporio",
    description: "Ambientes, importados, fabrica propria e uma curadoria que faz a compra virar experiencia.",
    href: "/emporio",
    image: "/images/emporio.jpg",
  },
  {
    title: "Curadoria",
    description: "Conteudos, historias e referencias para ampliar seu repertorio gastronomico.",
    href: "/curadoria",
    image: "/images/curadoria1.png",
  },
];

const featureHighlights = [
  {
    title: "Nossos Produtos",
    text: "Padaria, rotisserie e confeitaria com producao propria e ingredientes selecionados.",
    href: "/produtos",
  },
  {
    title: "Nossos Servicos",
    text: "Encomendas, personal shopper, eventos e cestas personalizadas.",
    href: "/servicos",
  },
  {
    title: "Sushi Menu",
    text: "Veja o cardapio completo do sushi Santa Maria em PDF.",
    href: "/CardapioSushi.pdf",
    external: true,
  },
];

export default function HomePage() {
  return (
    <>
      <HeroCarousel />

      <section className="section-shell bg-[var(--color-brown-dark)] text-white">
        <div className="content-grid text-center">
          <h2 className="text-3xl font-semibold md:text-5xl">
            Venha viver essa experiencia no Santa Maria Emporio. Todos os dias, a partir das 9h.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/78">
            Seu cafe da manhã nunca mais sera so cafe da manhã.
          </p>
        </div>
      </section>

      <section className="section-shell bg-[var(--color-surface)]">
        <div className="content-grid">
          <div className="mb-10 max-w-3xl">
            <p className="section-eyebrow">Rotas em destaque</p>
            <h2 className="section-title">Destaques</h2>
          </div>

          <div className="card-grid">
            {homeCards.map((card) => (
              <Link key={card.title} href={card.href} className="site-card overflow-hidden">
                <div className="card-grid__image">
                  <Image src={card.image} alt={card.title} fill className="object-cover transition duration-500 hover:scale-105" />
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

      <section className="section-shell bg-white">
        <div className="content-grid">
          <div className="grid gap-8 lg:grid-cols-3">
            {featureHighlights.map((item) =>
              item.external ? (
                <a key={item.title} href={item.href} target="_blank" rel="noreferrer" className="site-card p-8">
                  <p className="section-eyebrow">Explore</p>
                  <h3 className="card-grid__title mt-3">{item.title}</h3>
                  <p className="card-grid__description mt-4">{item.text}</p>
                  <span className="mt-8 inline-flex text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                    Abrir
                  </span>
                </a>
              ) : (
                <Link key={item.title} href={item.href} className="site-card p-8">
                  <p className="section-eyebrow">Explore</p>
                  <h3 className="card-grid__title mt-3">{item.title}</h3>
                  <p className="card-grid__description mt-4">{item.text}</p>
                  <span className="mt-8 inline-flex text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                    Ver pagina
                  </span>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>
    </>
  );
}
