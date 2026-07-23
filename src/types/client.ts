
export type TabId = "geral" | "beneficios" | "promocoes" | "historico" | "cadastro";
export type FilterValue = "todas" | "padaria" | "adega" | "brunch";

export type Benefit = {
  id: string;
  icon: string;
  title: string;
  description: string;
  used: number;
  total: number;
  rules: Array<{ label: string; value: string }>;
  note: string;
};

export type HistoryEntry = {
  date: string;
  benefit: string;
  store: string;
};

export type PromotionCard = {
  id: string;
  category: "padaria" | "adega" | "brunch";
  discountLabel: string;
  icon: string;
  title: string;
  store: string;
  oldPrice: string;
  newPrice: string;
  validity: string;
};

