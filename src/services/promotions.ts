import type { Promotion } from "@/types/promotion";

const promotions: Promotion[] = [
  {
    id: "welcome-20",
    title: "Boas-vindas no Empório",
    description: "Ative 20% OFF na primeira compra em padaria, confeitaria e itens selecionados do empório.",
    discountLabel: "20% OFF",
    validUntil: "2026-07-31",
    status: "active",
    category: "Primeira compra",
  },
  {
    id: "wine-week",
    title: "Curadoria de Vinhos",
    description: "Leve 3 rótulos participantes e receba um desconto especial no fechamento.",
    discountLabel: "15% OFF",
    validUntil: "2026-07-20",
    status: "active",
    category: "Adega",
  },
  {
    id: "brunch-special",
    title: "Experiencia Brunch",
    description: "Ative um mimo exclusivo ao pedir dois menus brunch no mesmo pedido.",
    discountLabel: "Mimo especial",
    validUntil: "2026-08-02",
    status: "active",
    category: "Brunch",
  },
  {
    id: "cheese-board",
    title: "Tabua de Frios",
    description: "Benefício já utilizado em uma montagem especial com itens da nossa curadoria.",
    discountLabel: "Beneficio usado",
    validUntil: "2026-06-30",
    usedAt: "2026-06-28",
    status: "used",
    category: "Frios",
  },
];

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getActivePromotions() {
  await delay(200);
  return promotions.filter((promotion) => promotion.status === "active");
}

export async function getUsedPromotions() {
  await delay(200);
  return promotions.filter((promotion) => promotion.status === "used");
}
