"use client";

import { useState } from "react";
import type { Promotion } from "@/types/promotion";
import PromocaoCard from "./promocoes-card";

export default function PromocoesTabs({
  active,
  used,
}: {
  active: Promotion[];
  used: Promotion[];
}) {
  const [tab, setTab] = useState<"active" | "used">("active");
  const list = tab === "active" ? active : used;

  return (
    <div>
      <div className="mb-8 flex gap-2 border-b border-[rgba(104,64,49,0.1)]">
        <button
          onClick={() => setTab("active")}
          className={`border-b-2 px-4 py-3 text-sm tracking-wide transition-colors ${
            tab === "active"
              ? "border-[var(--color-accent)] font-semibold text-[var(--color-brown)]"
              : "border-transparent text-[var(--color-muted)] hover:text-[var(--color-brown)]"
          }`}
        >
          Ativas ({active.length})
        </button>
        <button
          onClick={() => setTab("used")}
          className={`border-b-2 px-4 py-3 text-sm tracking-wide transition-colors ${
            tab === "used"
              ? "border-[var(--color-accent)] font-semibold text-[var(--color-brown)]"
              : "border-transparent text-[var(--color-muted)] hover:text-[var(--color-brown)]"
          }`}
        >
          Utilizadas ({used.length})
        </button>
      </div>

      {list.length === 0 ? (
        <p className="py-12 text-center text-sm text-[var(--color-muted)]">
          {tab === "active"
            ? "Voce nao tem promocoes ativas no momento."
            : "Nenhuma promocao utilizada ainda."}
        </p>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {list.map((promo) => (
            <PromocaoCard key={promo.id} promo={promo} />
          ))}
        </div>
      )}
    </div>
  );
}
