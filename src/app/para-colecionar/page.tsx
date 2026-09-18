import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PT_Sans } from "next/font/google";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import styles from "./para-colecionar.module.css";
import { Footer } from "./layout/Footer";
import { SelosFaqLink } from "./components/Faq";
import { MobileNav } from "./components/MobileNav";
import { RegulamentoLink } from "./components/Regulamento";

const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: "700",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Para Colecionar — Le Cordon Bleu",
  description:
    "Le Cordon Bleu para colecionar: participe da campanha Círculo Santa Maria e garanta descontos exclusivos na coleção Éternité de ferro fundido.",
};

const subnavItems = [
  { href: "#participar", label: "Como participar" },
  { href: "#inicio", label: "Caçarolas, frigideira e wok\nÉternité Le Cordon Bleu®" },
  { href: "#comprar", label: "Compra com e sem desconto" },
  { href: "#regulamento", label: "Regras de participação" },
  { href: "#produtos-aceleradores", label: "Produtos aceleradores" },
  { href: "#faq", label: "FAQ" },
];

const featureItems = [
  {
    image: "/images/para-colecionar/frigideira.png",
    alt: "Frigideira de ferro 26cm Le Cordon Bleu: destinadas ao uso em fogão ou forno, compatíveis com indução, gás, elétricos, vitrocerâmicos e halógenos, cozinha os alimentos de forma uniforme e eficiente.",
  },
  {
    image: "/images/para-colecionar/wok.png",
    alt: "Wok de ferro com tampa 26cm Le Cordon Bleu: ampla capacidade para refeições em família, estrutura durável com tampa de vidro temperado e cozimento uniforme que preserva os nutrientes dos alimentos.",
  },
  {
    image: "/images/para-colecionar/cacarola-22cm.png",
    alt: "Caçarola de ferro com tampa 22cm Le Cordon Bleu: produzida em ferro fundido, garante cozimento uniforme e a tampa de ferro mantém o calor e intensifica os sabores.",
  },
  {
    image: "/images/para-colecionar/cacarola-26cm.png",
    alt: "Caçarola de ferro com tampa 26cm Le Cordon Bleu: maior capacidade para receitas familiares, perfeita para ensopados, carnes e cozidos de longa duração.",
  },
];

const careItems = [
  {
    Icon: 'icone-mao.png',
    text: "Embora algumas panelas de ferro fundido esmaltado possam ser lavadas na lava-louças, a lavagem à mão é sempre recomendada para preservar a beleza e a durabilidade do esmalte.",
  },
  {
    Icon: 'icone-sabonete.png',
    text: "Evite usar utensílios de metal para não riscar o esmalte. Use utensílios de madeira, silicone ou nylon.",
  },
  {
    Icon: 'icone-luvas.png',
    text: "O cabo e a tampa da panela podem ficar quentes. Use luvas de cozinha ao manuseá-los.",
  },
];

export default function ParaColecionarPage() {
  return (
    <div className={styles.page}>
      <nav className={styles.subnav} aria-label="Navegação da campanha Para Colecionar">
        <div className={`${styles.subnavInner} ${styles.container} ${ptSans.className}`}>
          {subnavItems.map((item) =>
            item.href === "#faq" ? (
              <SelosFaqLink
                key={item.href}
                label={item.label}
                wrapperClassName={styles.faqTrigger}
                className={styles.faqButton}
              />
            ) : (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            )
          )}
          <Link
            className={styles.navCta}
            href="https://www.santamaria.com.br/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Empório Santa Maria
          </Link>
        </div>

        <MobileNav
          items={subnavItems}
          ctaHref="https://www.santamaria.com.br/"
          ctaLabel="Empório Santa Maria"
          instagramHref="https://www.instagram.com/stamariaemporio/"
          facebookHref="https://www.facebook.com/p/Santa-Maria-Emp%C3%B3rio-61568774857483/"
        />
      </nav>

      <aside className={styles.socialRail} aria-label="Redes sociais">
        <Link href="https://www.instagram.com/stamariaemporio/" target="_blank" rel="noreferrer" aria-label="Instagram">
          <FaInstagram size={32} />
        </Link>
        <Link href="https://www.facebook.com/p/Santa-Maria-Emp%C3%B3rio-61568774857483/" target="_blank" rel="noreferrer" aria-label="Facebook">
          <FaFacebookF size={32} />
        </Link>
      </aside>

      <main>
        <section id="inicio" className={styles.hero}>
          <div className={styles.heroInner}>
            <Image
              src="/images/para-colecionar/topo-selo.png"
              alt="Le Cordon Bleu para colecionar — Santa Maria"
              width={987}
              height={253}
              sizes="(min-width: 987px) 987px, 100vw"
              priority
              style={{ width: "100%", height: "auto" }}
            />
            <Image
              src="/images/para-colecionar/hero-panelas.png"
              alt="Coleção Éternité de panelas Le Cordon Bleu, exclusiva para clientes Círculo Santa Maria"
              width={987}
              height={880}
              sizes="(min-width: 987px) 987px, 100vw"
              priority
              style={{ width: "100%", height: "auto" }}
            />
            <div className={styles.heroActions}>
              <p>Cadastre-se para participar da campanha e conheça os descontos<br />exclusivos na loja e no app.</p>
              <Link className={styles.button} href="https://circulo.emporiosantamaria.com.br/criar-conta" target="_blank" rel="noopener noreferrer">
                Inscreva-se!
              </Link>
              <p className={styles.fine}>
                Entrega de selos de 21/09/2026 até 13/12/2026. Troca de cartelas até 20/12/2026 ou até durarem os
                estoques.
                <br />
                Válido para compras no mesmo cupom fiscal. Produtos fabricados na China.
              </p>
            </div>
            <Image
              className={styles.brands}
              src="/images/para-colecionar/marcas-participantes.png"
              alt="Marcas participantes da campanha"
              width={1000}
              height={52}
              sizes="100vw"
              style={{ width: "100vw", height: "auto" }}
            />
          </div>
        </section>

        <section id="participar" className={styles.brownSection}>
          <div className={`${styles.container} ${styles.narrow}`}>
            <h2 className={styles.sectionTitle}>Veja como participar</h2>
            <Image
              className={styles.stepsCard}
              src="/images/para-colecionar/passo-a-passo.png"
              alt="Passo a passo: faça suas compras, acumule selos a cada R$ 40,00 e troque por desconto a partir de 30 selos"
              width={978}
              height={231}
              sizes="(min-width: 978px) 978px, 100vw"
              style={{ width: "100%", height: "auto" }}
            />

            <p className={styles.intro}>
              Prepare-se para uma experiência única e inesquecível! O maior e mais renomado instituto de artes
              culinárias e hospitalidade do mundo, o Le Cordon Bleu™, trazendo uma linha inédita de produtos, testados
              e aprovados pelas mais renomadas chefs do planeta! Uma verdadeira revolução gastronômica. Está prestes a
              ganhar vida!
            </p>

            <div className={styles.featureList}>
              {featureItems.map((item) => (
                <Image
                  key={item.image}
                  className={styles.featureImage}
                  src={item.image}
                  alt={item.alt}
                  width={850}
                  height={168}
                  sizes="(min-width: 850px) 850px, 100vw"
                  style={{ width: "100%", height: "auto" }}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="regulamento" className={styles.cordonSection}>
          <div className={styles.cordonContent}>
            <Image
              className={styles.cordonLogo}
              src="/images/para-colecionar/logo-le-cordon-bleu.png"
              alt="Le Cordon Bleu"
              width={199}
              height={90}
              style={{ width: "12.438rem", height: "auto" }}
            />
            <h2 className={`${styles.cordonTitle} ${ptSans.className}`}>
              Conheça o Le Cordon Bleu<sup>®</sup>
            </h2>
            <p>
              O instituto de culinária mais renomado do mundo. LE CORDON BLEU® é uma rede global de institutos de
              artes culinárias e gestão de hospitalidade, com 129 anos de tradição e excelência. Fundada em Paris em
              1895, a instituição é referência na formação de profissionais da gastronomia e hospitalidade.
            </p>
            <p>
              Com 35 escolas em mais de 20 países, o LE CORDON BLEU® oferece programas de alta qualidade com
              certificados e diplomas reconhecidos internacionalmente. No Brasil, com unidades no Rio de Janeiro e em
              São Paulo, os alunos têm a oportunidade de aprender e se especializar em programas como os Diplômes de
              Cuisine, Pâtisserie, Boulangerie, Cordontec, Cozinha Brasileira, Plant Based e Wine &amp; Spirits.
            </p>
            <p>
              Anualmente, cerca de 20 mil alunos de mais de 100 nacionalidades diferentes se formam no Le Cordon
              Bleu, prontos para se destacar em diversas áreas, como cozinhas de restaurantes, serviços de bufê,
              gestão de restaurantes e hotéis, consultoria e muito mais.
            </p>
            <p>
              Além das escolas, o instituto oferece o Culinary Village em São Paulo, com um café, coworking e cozinha
              de inovação; e no Rio de Janeiro, o renomado restaurante Signatures.
            </p>
            <p>
              Visite o LE CORDON BLEU® e descubra como transformar sua paixão pela hospitalidade em uma carreira
              internacional
              <br />
              <Link
                className={styles.cordonLink}
                href="https://www.cordonbleu.edu/home/pt-br"
                target="_blank"
                rel="noopener noreferrer"
              >
                cordonbleu.edu/home/pt-br
              </Link>
            </p>

            <div className={styles.careGrid}>
              {careItems.map(({ Icon, text }) => (
                <div key={text} className={styles.careItem}>
                  <Image src={`/images/${Icon}`} alt="" width={200} height={200} className="w-full" />
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="comprar" className={styles.productsSection}>
          <div className={`${styles.container} ${styles.narrow}`}>
            <h2 className={styles.sectionTitle}>
              Como comprar suas caçarolas, frigideira e wok Éternité
              <br />
              Le Cordon Bleu® com e sem desconto
            </h2>
            <Image
              className={styles.cookware}
              src="/images/para-colecionar/tabela-precos.png"
              alt="Tabela de preços e selos necessários para caçarolas, frigideira e wok Éternité Le Cordon Bleu"
              width={772}
              height={681}
              sizes="(min-width: 772px) 772px, 100vw"
              style={{ width: "100%", height: "auto" }}
            />
            <p className={styles.productsFine}>
              *Produtos fabricados na China.
              <br />
              Produtos sujeitos a disponibilidade nas lojas. Imagens ilustrativas.
            </p>

            <h2 id="produtos-aceleradores" className={`${styles.sectionTitle} ${styles.productsTitle}`}>
              Confira os produtos que garantem selos extras
            </h2>
            <Image
              className={styles.productsGrid}
              src="/images/para-colecionar/produtos-selos.png"
              alt="Produtos que garantem selos extras na campanha"
              width={847}
              height={986}
              sizes="(min-width: 847px) 847px, 100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </section>

        <section id="faq" className={styles.footerSection}>
          <div className={styles.footerInner}>
            <h2>Consulte nossa FAQ e tire suas dúvidas</h2>
            <div className={styles.rule} />

            <p className={styles.selosInfo}>
              Selos extras válidos para compras a partir de R$ 40,00, no mesmo cupom fiscal, para clientes Círculo
              Santa Maria.
            </p>

            <Image
              className={styles.noAlcohol}
              src="/images/para-colecionar/proibido-bebidas.png"
              alt="Proibido para menores de 18 anos"
              width={118}
              height={113}
              style={{ width: "118px", height: "auto" }}
            />
            <p className={styles.legalSmall}>
              É proibida a venda e a entrega de bebidas alcoólicas para menores de 18 anos.
              <br />
              Produtos sujeitos à disponibilidade nas lojas.
            </p>

            <p className={styles.regulamentoLine}>
              Confira o regulamento completo
              <RegulamentoLink className={styles.regulamentoLink} />
            </p>
          </div>
          <Footer />
        </section>
      </main>
    </div>
  );
}
