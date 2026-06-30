"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    eyebrow: "Todos os dias, das 9h as 13h",
    title: "Brunch Santa Maria",
    href: "/brunch",
    image: "/images/foto3.jpg",
  },
  {
    eyebrow: "Cidade Jardim",
    title: "Santa Maria",
    href: "https://www.google.com/maps/place/Santa+Maria+Emp%C3%B3rio+Cidade+Jardim/",
    image: "/images/foto2.png",
    external: true,
  },
  {
    eyebrow: "Sushi",
    title: "Santa Maria",
    href: "https://www.instagram.com/stamariasushi/",
    image: "/images/foto1.jpg",
    external: true,
  },
];

export function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-black">
      {slides.map((slide, index) => (
        <div
          key={slide.image}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
            index === activeSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.35)), url(${slide.image})` }}
        />
      ))}

      <div className="relative mx-auto flex min-h-[75vh] max-w-7xl flex-col items-center justify-center px-4 py-24 text-center text-white sm:px-6 lg:px-8">
        <p className="text-lg tracking-[0.2em] text-white/85" style={{ fontFamily: "CeraLight, sans-serif" }}>
          {slides[activeSlide].eyebrow}
        </p>
        <h1
          className="mt-6 max-w-4xl text-5xl uppercase tracking-[0.18em] sm:text-6xl lg:text-7xl"
          style={{ fontFamily: "CeraBold, sans-serif" }}
        >
          {slides[activeSlide].title}
        </h1>

        {slides[activeSlide].external ? (
          <a
            href={slides[activeSlide].href}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex rounded border border-white px-8 py-3 text-sm uppercase tracking-[0.25em] transition hover:bg-white hover:text-[#583729]"
          >
            Descubra
          </a>
        ) : (
          <Link
            href={slides[activeSlide].href}
            className="mt-10 inline-flex rounded border border-white px-8 py-3 text-sm uppercase tracking-[0.25em] transition hover:bg-white hover:text-[#583729]"
          >
            Descubra
          </Link>
        )}

        <div className="mt-10 flex gap-3">
          {slides.map((slide, index) => (
            <button
              key={slide.image}
              type="button"
              onClick={() => setActiveSlide(index)}
              className={`h-2.5 w-10 rounded-full transition ${
                index === activeSlide ? "bg-[#f0c15d]" : "bg-white/35"
              }`}
              aria-label={`Mostrar slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
