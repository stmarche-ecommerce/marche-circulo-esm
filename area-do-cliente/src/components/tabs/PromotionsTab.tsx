"use client";

import { useMemo, useState } from "react";
import { promotionCategories, promotions } from "@/data/mock-data";
import type { PromotionCategory } from "@/types";

type FilterValue = PromotionCategory | "todas";

export default function PromotionsTab() {
  const [filter, setFilter] = useState<FilterValue>("todas");

  const visibleCategories = useMemo(
    () =>
      promotionCategories.filter(
        (category) => filter === "todas" || category.id === filter,
      ),
    [filter],
  );

  return (
    <div>
      <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-burgundy">
        Promoções
      </div>
      <h1 className="mb-2.5 font-display text-[32px] font-medium leading-tight md:text-[34px]">
        Veja as promoções desse mês
      </h1>
      <p className="mb-7 max-w-xl text-[15px] leading-relaxed text-[#5b4d40]">
        Ofertas selecionadas pelo time Santa Maria, organizadas por
        categoria.
      </p>

      <div className="mb-7 flex flex-wrap gap-2.5" role="group" aria-label="Filtrar promoções por categoria">
        <FilterChip
          label="Todas"
          isActive={filter === "todas"}
          onClick={() => setFilter("todas")}
        />
        {promotionCategories.map((category) => (
          <FilterChip
            key={category.id}
            label={category.title}
            isActive={filter === category.id}
            onClick={() => setFilter(category.id)}
          />
        ))}
      </div>

      {visibleCategories.map((category) => (
        <div key={category.id} className="mb-9">
          <h2 className="mb-1 font-display text-xl font-medium">
            {category.title}
          </h2>
          <p className="mb-4 text-[13px] text-muted">{category.description}</p>
          <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            {promotions
              .filter((promo) => promo.category === category.id)
              .map((promo) => (
                <article
                  key={promo.id}
                  className="relative rounded-2xl border border-line bg-paper-2 p-[18px]"
                >
                  <span className="absolute right-3.5 top-3.5 rounded-full bg-burgundy px-2.5 py-1 text-xs font-semibold text-white">
                    {promo.discountLabel}
                  </span>
                  <div
                    className="mb-3.5 flex h-[110px] w-full items-center justify-center rounded-xl bg-[#f1e6d6] text-[28px] text-[#c9a86a]"
                    aria-hidden="true"
                  >
                    {promo.icon}
                  </div>
                  <h3 className="mb-1 font-display text-base font-medium">
                    {promo.title}
                  </h3>
                  <div className="mb-3 text-xs text-muted">{promo.store}</div>
                  <div className="mb-1 flex items-baseline gap-2">
                    <span className="text-[13px] text-muted line-through">
                      {promo.oldPrice}
                    </span>
                    <span className="font-mono text-lg font-medium text-burgundy-dark">
                      {promo.newPrice}
                    </span>
                  </div>
                  <div className="text-[11.5px] text-muted">
                    {promo.validity}
                  </div>
                </article>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function FilterChip({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={`focus-ring rounded-full border px-[18px] py-2 text-[13px] transition-colors ${
        isActive
          ? "border-burgundy bg-burgundy font-medium text-white"
          : "border-line bg-paper-2 text-[#5b4d40] hover:border-burgundy/40"
      }`}
    >
      {label}
    </button>
  );
}
