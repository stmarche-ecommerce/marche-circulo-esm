
import Image from "next/image";
import Link from "next/link";

const homeCards = [
  {
    title: "Brunch",
    description: "Um novo espaco para celebrar a manha, todos os dias a partir das 9h.",
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
      <section className="relative overflow-hidden bg-[var(--color-ink)] text-white">
        <div className="absolute inset-0">
          <Image src="/images/foto3.jpg" alt="" fill priority className="object-cover opacity-24" />
        </div>
        <div className="absolute inset-0 " />

        <div className="content-grid relative flex min-h-[68vh] flex-col items-center justify-center py-24 text-center">
          <p className="section-eyebrow text-[var(--color-accent-soft)]">Santa Maria Emporio</p>
          <h1 className="max-w-5xl text-4xl font-semibold uppercase tracking-[0.18em] md:text-6xl">
            Gastronomia, curadoria e encontros que celebram a vida
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/82 md:text-xl">
            Um espaco que combina conveniencia, sabor e descoberta em cada detalhe
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/brunch" className="site-button">
              Descobrir brunch
            </Link>
            <Link href="/emporio" className="site-button site-button--ghost">
              Conhecer o emporio
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell bg-[var(--color-brown-dark)] text-white">
        <div className="content-grid text-center">
          <h2 className="text-3xl font-semibold md:text-5xl">
            Venha viver essa experiencia no Santa Maria Emporio. Todos os dias, a partir das 9h.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/78">
            Seu cafe da manha nunca mais sera so cafe da manha.
          </p>
        </div>
      </section>

      <section className="section-shell bg-[var(--color-surface)]">
        <div className="content-grid">
          <div className="mb-10 max-w-3xl">
            <p className="section-eyebrow">Rotas em destaque</p>
            <h2 className="section-title">Paginas reais, consistentes e alinhadas com a identidade do site</h2>
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
