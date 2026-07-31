"use client";

import type { ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SparkleOverlay from "../sparkeeoverlay";

const slides = [
  {
    eyebrow: "Todos os dias, a partir das 9h",
    title: "Brunch Santa Maria",
    description: "Um convite para desacelerar, descobrir novos sabores e começar o dia celebrando a vida.",
    href: "/",
    cta: "Descobrir brunch",
    image: "/images/branch1.jpg",
  },
  {
    eyebrow: "Empório",
    title: "Curadoria que transforma a compra em experiência",
    description: "Importados, produção própria e seleção especial em um espaço pensado para inspirar encontros.",
    href: "/emporio",
    cta: "Conhecer o empório",
    image: "/images/foto3.jpg",
  },
  {
    eyebrow: "Sushi e especiais",
    title: "Sabores para cada momento do seu dia",
    description: "Explore menus, produtos frescos e novidades que fazem parte da rotina do Santa Maria.",
    href: "/cardápioSushi.pdf",
    cta: "Abrir cardápio",
    image: "/images/foto1.jpg",
    external: true,
  },
];

type ArrowProps = ComponentPropsWithoutRef<"button">;

function CustomPrevArrow({ className, style, onClick }: ArrowProps) {
  return (
    <button
      type="button"
      className={["custom-arrow", "custom-arrow-prev", className].filter(Boolean).join(" ")}
      style={style}
      onClick={onClick}
      aria-label="Slide anterior"
    >
      <ChevronLeft size={24} />
    </button>
  );
}

function CustomNextArrow({ className, style, onClick }: ArrowProps) {
  return (
    <button
      type="button"
      className={["custom-arrow", "custom-arrow-next", className].filter(Boolean).join(" ")}
      style={style}
      onClick={onClick}
      aria-label="Próximo slide"
    >
      <ChevronRight size={24} />
    </button>
  );
}

const sliderSettings = {
  accessibility: true,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 6000,
  dots: true,
  fade: false,
  infinite: false,
  nextArrow: <CustomNextArrow />,
  pauseOnFocus: true,
  pauseOnHover: true,
  prevArrow: <CustomPrevArrow />,
  slidesToScroll: 1,
  slidesToShow: 1,
  speed: 500,
  swipeToSlide: true,
};

export function HeroCarousel() {
  return (
    <section className="hero-carousel relative h-[clamp(32rem,72vh,46rem)] overflow-hidden bg-[var(--color-ink)] text-white" aria-label="Destaques do Santa Maria Empório">
      <Slider {...sliderSettings}>
        {slides.map((slide, index) => {
          const content = (
            <>
              <div className="absolute inset-0" aria-hidden="true">
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  priority={index === 0}
                  loading="eager"
                  quality={75}
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,15,12,0.18),rgba(22,15,12,0.7)),linear-gradient(90deg,rgba(47,44,82,0.84),rgba(47,44,82,0.36))]" />
              </div>

              <div className="absolute inset-0 z-[5]" aria-hidden="true">
                <SparkleOverlay count={16} colors={["#e8c674", "#f4dfa3", "#ffffff", "#c9a35c"]} />
              </div>

              <div className="content-grid relative z-10 flex h-full items-center py-24">
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

          const accessibleLabel = `${slide.title}. ${slide.description}`;

          return (
            <div key={slide.title} className="h-full">
              {slide.external ? (
                <a
                  href={slide.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hero-carousel__slide relative flex"
                  aria-label={accessibleLabel}
                >
                  {content}
                </a>
              ) : (
                <Link href={slide.href} className="hero-carousel__slide relative flex" aria-label={accessibleLabel}>
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
