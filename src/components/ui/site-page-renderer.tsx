import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Headset, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

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
                  <p className="section-eyebrow">Santa Maria Empório</p>
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

function ContactDetail({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="group flex items-center gap-3 rounded-lg px-2 py-2 -mx-2 transition-colors hover:bg-[var(--color-accent)]/5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-brown-dark)] text-[var(--color-accent-soft)] ring-2 ring-[var(--color-accent)]/25 transition group-hover:ring-[var(--color-accent)]/50">
        {icon}
      </div>
      <div className="flex min-w-0 items-baseline gap-2">
        <p className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-accent)]">
          {label}
        </p>
        {href ? (
          <a href={href} className="truncate text-sm font-semibold text-[var(--color-brown-dark)] transition group-hover:text-[var(--color-accent)]">
            {value}
          </a>
        ) : (
          <p className="truncate text-sm font-semibold text-[var(--color-brown-dark)]">{value}</p>
        )}
      </div>
    </div>
  );
}

function ContactCardDetails({ card }: { card: NonNullable<SitePage["contactInfo"]>["cards"] extends (infer T)[] | undefined ? T : never }) {
  const samePhoneAndWhatsapp = Boolean(card.whatsapp && card.phone && card.whatsapp === card.phone);

  return (
    <>
      {card.email ? (
        <ContactDetail
          icon={<Mail size={18} />}
          label="E-mail"
          value={card.email}
          href={`mailto:${card.email}`}
        />
      ) : null}

      {samePhoneAndWhatsapp ? (
        <ContactDetail
          icon={<MessageCircle size={18} />}
          label="WhatsApp / Telefone"
          value={card.phone as string}
          href={`https://wa.me/${(card.phone as string).replace(/\D/g, "")}`}
        />
      ) : (
        <>
          {card.whatsapp ? (
            <ContactDetail
              icon={<MessageCircle size={18} />}
              label="WhatsApp"
              value={card.whatsapp}
              href={`https://wa.me/${card.whatsapp.replace(/\D/g, "")}`}
            />
          ) : null}
          {card.phone ? (
            <ContactDetail
              icon={<Phone size={18} />}
              label="Telefone"
              value={card.phone}
              href={`tel:${card.phone.replace(/[^\d+]/g, "")}`}
            />
          ) : null}
        </>
      )}

      {card.address ? (
        <ContactDetail
          icon={<MapPin size={18} />}
          label=""
          value={card.address}
        />
      ) : null}


      {card.sac ? (
        <ContactDetail
          icon={<Headset size={18} />}
          label=""
          value={card.sac}
        />
      ) : null}
    </>
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
            <h2 className="section-title !text-3xl md:!text-4xl">{contact.title}</h2>
            <p className="mt-5 text-lg leading-8 text-[var(--color-muted)]">{contact.description}</p>

            <div className="mt-8 space-y-8">
              {contact.cards?.map((card) => (
                <article key={card.title}>
                  <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-brown-dark)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                    {card.title}
                  </h3>
                  <div className="mt-3 space-y-1">
                    <ContactCardDetails card={card} />
                  </div>
                </article>
              ))}

              {!contact.cards?.length ? (
                <div className="divide-y divide-[var(--color-border)]/40">
                  {contact.email ? (
                    <ContactDetail
                      icon={<Mail size={18} />}
                      label="E-mail"
                      value={contact.email}
                      href={`mailto:${contact.email}`}
                    />
                  ) : null}
                  {contact.phone ? (
                    <ContactDetail
                      icon={<Phone size={18} />}
                      label="Telefone"
                      value={contact.phone}
                      href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                    />
                  ) : null}
                </div>
              ) : null}
            </div>
          </article>

          <article className="site-card p-8 md:p-10">
            <h2 className="section-title !text-3xl md:!text-4xl">Envie sua mensagem</h2>
            <p className="mt-5 text-lg leading-8 text-[var(--color-muted)]">
              O formulario abre seu aplicativo de e-mail com a mensagem preenchida.
            </p>
            <div className="mt-8">
              <ContactForm destinationEmail={page.slug === "contato" ? "valdir.silva@marche.com.br" : contact.email ?? "contato@emporiosantamaria.com.br"} defaultSubject={page.title} />
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