import { SitePageRenderer } from "@/components/ui/site-page-renderer";
import type { SitePage } from "@/lib/site-config";

const brunchPage: SitePage = {
  slug: "brunch",
  title: "Brunch",
  description: "Conheca o novo espaco de brunch do Santa Maria Emporio.",
  template: "feature",
  hero: {
    title: "Um novo espaco para celebrar a manha",
    description:
      "Bebidas quentes e frias, refeicoes leves ou mais elaboradas com o toque de afeto do Santa Maria para transformar qualquer pausa em um momento especial.",
    image: "/images/branch.png",
  },
  alternatingSections: [
    {
      title: "Um convite para desacelerar",
      text: [
        "No coracao do nosso emporio, criamos um espaco onde o tempo parece desacelerar.",
        "Ali, entre aromas convidativos e luz suave, os dias comecam com mais leveza.",
      ],
      image: "/images/branch1.jpg",
    },
    {
      title: "Sabores para qualquer humor matinal",
      text: [
        "Servimos paes artesanais, ovos preparados na hora, frutas frescas, panquecas douradas e uma selecao especial de bebidas quentes e frias.",
        "Tudo com aquele toque de afeto e sofisticacao que ja faz parte da Experiencia Santa Maria.",
      ],
      image: "/images/branch2.jpg",
      imageLeft: true,
    },
    {
      title: "Brunch, pausa e reencontro",
      text: [
        "E brunch, mas tambem e pausa. E reencontro, e descobrir um novo favorito no cardapio.",
        "Um comeco de dia comum vira momento de celebracao.",
      ],
      image: "/images/branch3.jpg",
    },
  ],
  intro: [
    "O Santa Maria e referencia em gastronomia em Sao Paulo e conta com padaria, rotisserie, confeitaria, sushi, cafe e fabrica de massas.",
    "Tudo feito com os melhores ingredientes, qualidade e atendimento unicos!",
  ],
};

export default function BrunchPage() {
  return <SitePageRenderer page={brunchPage} />;
}
