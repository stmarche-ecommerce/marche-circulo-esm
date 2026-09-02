import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Para Colecionar",
  description: "Página em preparação com novidades especiais do Santa Maria Empório.",
};

export default function ParaColecionarPage() {
  return (
    <>
      <section className="hero-shell hero-shell--compact">
        <Image
          src="/images/curadoria1.png"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="hero-shell__image"
        />
        <div className="hero-shell__overlay" />
        <div className="hero-shell__content text-center">
          <h1 className="hero-shell__title">Para colecionar</h1>
          <p className="hero-shell__description">
            Esta página já está ativa e em breve receberá o conteúdo completo.
          </p>
        </div>
      </section>

      <section className="section-shell bg-[var(--color-surface)]">
        <div className="content-grid max-w-3xl">
          <article className="site-card p-6 sm:p-8 md:p-10 text-center">
            <p className="section-eyebrow">Santa Maria Empório</p>
            <h2 className="section-title !text-3xl md:!text-4xl">Em breve</h2>
            <div className="rich-text mt-6">
              <p>O link de Para Colecionar já está publicado e pronto para uso.</p>
              <p>Assim que o conteúdo estiver definido, a página pode ser preenchida mantendo esta mesma URL.</p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
