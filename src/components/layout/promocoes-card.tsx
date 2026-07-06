import type { Promotion } from "@/types/promotion";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function PromocaoCard({ promo }: { promo: Promotion }) {
  const isUsed = promo.status === "used";

  return (
    <div
      className={`rounded-[1.6rem] border p-5 shadow-[0_16px_34px_rgba(71,42,35,0.05)] ${
        isUsed
          ? "border-[rgba(104,64,49,0.08)] bg-[rgba(245,239,232,0.66)]"
          : "border-[rgba(213,166,66,0.24)] bg-[linear-gradient(180deg,#fffdf8_0%,#ffffff_100%)]"
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium tracking-wide ${
            isUsed
              ? "bg-[rgba(104,64,49,0.1)] text-[rgba(104,64,49,0.7)]"
              : "bg-[rgba(213,166,66,0.14)] text-[#8a6a1f]"
          }`}
        >
          {promo.discountLabel}
        </span>
        <span className="text-xs text-[var(--color-muted)]">{promo.category}</span>
      </div>

      <h3 className="mb-1 text-base font-semibold text-[var(--color-brown)]">
        {promo.title}
      </h3>
      <p className="mb-4 text-sm leading-7 text-[var(--color-muted)]">
        {promo.description}
      </p>

      <p className="text-xs uppercase tracking-[0.16em] text-[rgba(104,64,49,0.45)]">
        {isUsed && promo.usedAt
          ? `Usada em ${formatDate(promo.usedAt)}`
          : `Valida ate ${formatDate(promo.validUntil)}`}
      </p>
    </div>
  );
}
