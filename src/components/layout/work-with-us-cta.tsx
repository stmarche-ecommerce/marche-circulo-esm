"use client";

export function WorkWithUsCta() {
  return (
    <section className="section-shell bg-[var(--color-surface)]">
      <div className="content-grid">
        <article className="site-card p-8 md:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="section-eyebrow">Institucional</p>
              <h2 className="section-title !text-3xl md:!text-4xl">Trabalhe conosco</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
                Confira as oportunidades abertas no grupo St Marche e encontre a vaga ideal para o seu proximo passo.
              </p>
            </div>

            <div className="flex lg:justify-end">
              <a href="https://stmarche.gupy.io/" target="_blank" rel="noreferrer" className="site-button inline-flex">
                Ver oportunidades
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}