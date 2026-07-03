"use client";

import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";

const slides = [
  {
    eyebrow: "Todos os dias, a partir das 9h",
    title: "Brunch Santa Maria",
    description: "Um convite para desacelerar, descobrir novos sabores e comecar o dia celebrando a vida.",
    href: "/brunch",
    cta: "Descobrir brunch",
    image: "/images/branch1.jpg",
  },
  {
    eyebrow: "Emporio",
    title: "Curadoria que transforma a compra em experiencia",
    description: "Importados, producao propria e selecao especial em um espaco pensado para inspirar encontros.",
    href: "/emporio",
    cta: "Conhecer o emporio",
    image: "/images/foto3.jpg",
  },
  {
    eyebrow: "Sushi e especiais",
    title: "Sabores para cada momento do seu dia",
    description: "Explore menus, produtos frescos e novidades que fazem parte da rotina do Santa Maria.",
    href: "/CardapioSushi.pdf",
    cta: "Abrir cardapio",
    image: "/images/foto1.jpg",
    external: true,
  },
];

const sliderSettings = {
  arrows: false,
  autoplay: true,
  autoplaySpeed: 5000,
  dots: true,
  fade: true,
  infinite: true,
  pauseOnHover: false,
  slidesToScroll: 1,
  slidesToShow: 1,
  speed: 700,
};

export function HeroCarousel() {
  return (
    <section className="hero-carousel relative min-h-[clamp(32rem,72vh,46rem)] overflow-hidden bg-[var(--color-ink)] text-white">
      <Slider {...sliderSettings}>
        {slides.map((slide, index) => {
          const content = (
            <>
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,15,12,0.18),rgba(22,15,12,0.7)),linear-gradient(90deg,rgba(47,44,82,0.84),rgba(47,44,82,0.36))]" />
              </div>

              <div className="content-grid relative z-10 flex min-h-[clamp(32rem,72vh,46rem)] items-center py-24">
                <div className="max-w-3xl">
                  <p className="section-eyebrow text-[var(--color-accent-soft)]">{slide.eyebrow}</p>
                  <h1 className="mt-5 text-4xl font-semibold uppercase tracking-[0.16em] md:text-6xl">
                    {slide.title}
                  </h1>
                  <p className="mt-6 max-w-2xl text-base leading-8 text-white/82 md:text-xl">
                    {slide.description}
                  </p>
                  <span className="site-button mt-10 inline-flex">{slide.cta}</span>
                </div>
              </div>
            </>
          );

          return (
            <div key={slide.title} className="h-full">
              {slide.external ? (
                <a href={slide.href} target="_blank" rel="noreferrer" className="hero-carousel__slide relative flex">
                  {content}
                </a>
              ) : (
                <Link href={slide.href} className="hero-carousel__slide relative flex">
                  {content}
                </Link>
              )}
            </div>
          );
        })}
      </Slider>
    </section>
  );
}
