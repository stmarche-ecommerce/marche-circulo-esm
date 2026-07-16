import Image from "next/image";
import Link from "next/link";

import { ContactForm } from "@/components/forms/contact-form";
import type { GridItem, SitePage } from "@/lib/site-config";

function GridCard({ item, className = "site-card overflow-hidden" }: { item: GridItem; className?: string }) {
  const cardContent = (
    <>
      <div className="card-grid__image">
        <Image src={item.image} alt={item.title} fill sizes="(min-width: 1280px) 23vw, (min-width: 1024px) 30vw, (min-width: 768px) 45vw, 92vw" className="object-cover transition duration-500 hover:scale-105" />
      </div>
      <div className="card-grid__body">
        <h3 className="card-grid__title">{item.title}</h3>
        <p className="card-grid__description">{item.description}</p>
      </div>
    </>
  );

  if (!item.href) {
    return <article className={className}>{cardContent}</article>;
  }

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noreferrer" className={className}>
        {cardContent}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className}>
      {cardContent}
    </Link>
  );
}

function HeroSection({ page }: { page: SitePage }) {
  return (
    <section className={`hero-shell ${page.hero.compact ? "hero-shell--compact" : ""}`}>
      <Image src={page.hero.image} alt="" aria-hidden="true" fill priority sizes="100vw" className="hero-shell__image" />
      <div className="hero-shell__overlay" />
      <div className={`hero-shell__content ${page.hero.align === "left" ? "text-left" : "text-center"}`}>
        {page.hero.eyebrow ? <p className="section-eyebrow text-white/75">{page.hero.eyebrow}</p> : null}
        <h1 className="hero-shell__title">{page.hero.title}</h1>
        <p className="hero-shell__description">{page.hero.description}</p>
      </div>
    </section>
  );
}

function FeatureSections({ page }: { page: SitePage }) {
  return (
    <>
      {page.alternatingSections?.map((section) => (
        <section key={section.title} className="section-shell bg-[var(--color-surface)]">
          <div className="content-grid">
            <div className={`feature-grid ${section.imageLeft ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="feature-copy">
                <p className="section-eyebrow">Experiência Santa Maria</p>
                <h2 className="section-title">{section.title}</h2>
                <div className="feature-copy__body">
                  {section.text.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
              <div className="feature-media">
                <Image src={section.image} alt={section.title} fill sizes="(min-width: 1024px) 42vw, 92vw" className="object-cover" />
              </div>
            </div>
          </div>
        </section>
      ))}

      {page.intro?.length ? (
        <section className="section-shell bg-[var(--color-ink)] text-white">
          <div className="content-grid max-w-4xl text-center">
            <h2 className="text-3xl font-semibold uppercase tracking-[0.16em] md:text-4xl">
              Viva a experiência
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-8 text-white/82">
              {page.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

function GridSections({ page }: { page: SitePage }) {
  return (
    <section className="section-shell bg-[var(--color-surface)]">
      <div className="content-grid">
        <div className="mb-10 max-w-3xl">
          <p className="section-eyebrow">Curadoria e gastronomia</p>
          <h2 className="section-title">Ambientes e seleções que definem o Santa Maria</h2>
        </div>

        <div className="card-grid">
          {page.gridItems?.map((item) => (
            <GridCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RichTextSections({ page }: { page: SitePage }) {
  return (
    <>
      {page.richTextSections?.length ? (
        <section className="section-shell bg-[var(--color-surface)]">
          <div className="content-grid">
            <div className="space-y-8">
              {page.richTextSections.map((section) => (
                <article key={section.title} className="site-card p-8 md:p-10">
                  <p className="section-eyebrow">Santa Maria Emporio</p>
                  <h2 className="section-title !text-3xl md:!text-4xl">{section.title}</h2>
                  <div className="rich-text mt-6">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {page.gridItems?.length ? (
        <section className="section-shell bg-white">
          <div className="content-grid">
            <div className="card-grid md:grid-cols-1 lg:grid-cols-2">
              {page.gridItems.map((item) => (
                <GridCard
                  key={item.title}
                  item={item}
                  className="site-card overflow-hidden md:grid md:grid-cols-[1.1fr_1fr]"
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

function InstitutionalSections({ page }: { page: SitePage }) {
  return (
    <section className="institutional-page">
      <div className="content-grid institutional-page__content">
        <h1 className="institutional-page__title">{page.title}</h1>
        {page.richTextSections?.map((section) => (
          <article key={section.title} className="institutional-page__section">
            {section.title !== page.title ? <h2>{section.title}</h2> : null}
            <div className="institutional-page__copy">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactSection({ page }: { page: SitePage }) {
  const contact = page.contactInfo;

  if (!contact) {
    return null;
  }

  return (
    <section className="section-shell bg-[var(--color-surface)]">
      <div className="content-grid">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="site-card p-8 md:p-10">
            <p className="section-eyebrow">Atendimento</p>
            <h2 className="section-title !text-3xl md:!text-4xl">{contact.title}</h2>
            <p className="mt-5 text-lg leading-8 text-[var(--color-muted)]">{contact.description}</p>
            <div className="mt-8 space-y-4 text-base ">
              {contact.email ? (
                <p>
                  E-mail:{" "}
                  <a className="font-semibold text-[var(--color-accent)]" href={`mailto:${contact.email}`}>
                    {contact.email}
                  </a>
                </p>
              ) : null}
              {contact.phone ? <p>Telefone: <span className="font-semibold">{contact.phone}</span></p> : null}
              <p>Endereco: Av. Cidade Jardim, 790 - Jd. Paulistano, Sao Paulo</p>
            </div>
          </article>

          <article className="site-card p-8 md:p-10">
            <p className="section-eyebrow">Formulario</p>
            <h2 className="section-title !text-3xl md:!text-4xl">Envie sua mensagem</h2>
            <p className="mt-5 text-lg leading-8 text-[var(--color-muted)]">
              O formulario abre seu aplicativo de e-mail com a mensagem preenchida.
            </p>
            <div className="mt-8">
              <ContactForm destinationEmail={contact.email ?? "contato@emporiosantamaria.com.br"} defaultSubject={page.title} />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export function SitePageRenderer({ page }: { page: SitePage }) {
  return (
    <>
      <HeroSection page={page} />
      {page.template === "feature" ? <FeatureSections page={page} /> : null}
      {page.template === "grid" ? <GridSections page={page} /> : null}
      {page.template === "richText" ? <RichTextSections page={page} /> : null}
      {page.template === "institutional" ? <InstitutionalSections page={page} /> : null}
      {page.template === "contact" ? <ContactSection page={page} /> : null}
    </>
  );
}



