"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SparkleOverlay from "../sparkeeoverlay";

const slides = [
  {
    eyebrow: "",
    title: "",
    description: "",
    href: "/para-colecionar",
    // cta: "Participar da campanha",
    image: "/images/para-colecionar/hero-banner.jpg",
    hideOverlayContent: true,
    desktopOnly: true,
  },
  {
    eyebrow: "Todos os dias, a partir das 9h",
    title: "Brunch Santa Maria",
    description: "Um convite para desacelerar, descobrir novos sabores e começar o dia celebrando a vida.",
    href: "/brunch",
    cta: "Descobrir brunch",
    image: "/images/branch1.jpg",
  },
  {
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
    href: "/CardapioSushi.pdf",
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);
    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);
    return () => mediaQuery.removeEventListener("change", updateIsMobile);
  }, []);

  const visibleSlides = slides.filter((slide) => !(slide.desktopOnly && isMobile));

  return (
    <section
      className="hero-carousel relative h-72 overflow-hidden bg-[var(--color-ink)] text-white lg:h-auto lg:aspect-15/4"
      aria-label="Destaques do Santa Maria Empório"
    >
      <Slider {...sliderSettings}>
        {visibleSlides.map((slide, index) => {
          const isBanner = Boolean(slide.hideOverlayContent);

          const content = isBanner ? (
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
              </div>
              <div className="absolute inset-0 z-[5]" aria-hidden="true">
                <SparkleOverlay count={16} colors={["#e8c674", "#f4dfa3", "#ffffff", "#c9a35c"]} />
              </div>
            </>
          ) : (
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
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,15,12,0.1),rgba(22,15,12,0.42)),linear-gradient(90deg,rgba(47,44,82,0.5),rgba(47,44,82,0.2))]" />
              </div>

              <div className="absolute inset-0 z-[5]" aria-hidden="true">
                <SparkleOverlay count={16} colors={["#e8c674", "#f4dfa3", "#ffffff", "#c9a35c"]} />
              </div>

              <div className="content-grid relative z-10 flex items-center px-10 py-8 lg:h-full lg:px-0 lg:py-24">
                <div className="max-w-3xl">
                  {slide.eyebrow ? (
                    <p className="section-eyebrow text-[var(--color-accent-soft)]">{slide.eyebrow}</p>
                  ) : null}
                  <h1 className="mt-3 text-lg font-semibold uppercase leading-tight tracking-[0.08em] sm:text-xl md:text-3xl lg:mt-5 lg:text-4xl lg:leading-normal lg:tracking-[0.16em]">
                    {slide.title}
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-white/82 sm:text-base lg:mt-6 lg:text-xl lg:leading-8">
                    {slide.description}
                  </p>
                  <span className="site-button mt-5 inline-flex text-sm lg:mt-10 lg:text-base">{slide.cta}</span>
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
                  className="hero-carousel__slide relative flex h-full"
                  aria-label={accessibleLabel}
                >
                  {content}
                </a>
              ) : (
                <Link href={slide.href} className="hero-carousel__slide relative flex h-full" aria-label={accessibleLabel}>
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
