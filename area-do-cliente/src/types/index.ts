export type TabId =
  | "geral"
  | "beneficios"
  | "promocoes"
  | "historico"
  | "cadastro";

export interface NavItem {
  id: TabId;
  label: string;
  icon: string;
}

export interface BenefitSummary {
  id: string;
  title: string;
  description: string;
  used: number;
  total: number;
}

export interface BenefitRule {
  label: string;
  value: string;
}

export interface BenefitDetail extends BenefitSummary {
  icon: string;
  rules: BenefitRule[];
  note: string;
}

export interface HistoryEntry {
  date: string;
  benefit: string;
  store: string;
}

export type PromotionCategory = "padaria" | "adega" | "brunch";

export interface Promotion {
  id: string;
  category: PromotionCategory;
  discountLabel: string;
  icon: string;
  title: string;
  store: string;
  oldPrice: string;
  newPrice: string;
  validity: string;
}

export interface PromotionCategoryInfo {
  id: PromotionCategory;
  title: string;
  description: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  memberSince: string;
}
