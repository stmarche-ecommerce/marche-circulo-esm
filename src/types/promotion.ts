export type PromotionStatus = "active" | "used";

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discountLabel: string;
  validUntil: string;
  usedAt?: string;
  status: PromotionStatus;
  category: string;
}
