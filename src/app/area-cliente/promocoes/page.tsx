"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/auth-context";
import { getActivePromotions, getUsedPromotions } from "@/services/promotions";
import PromocoesTabs from "@/components/layout/promocoes-tab";
import type { Promotion } from "@/types/promotion";

export default function PromocoesPage() {
  const { user } = useAuth();
  const [active, setActive] = useState<Promotion[]>([]);
  const [used, setUsed] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    let cancelled = false;

    async function loadPromotions() {
      try {
        setLoading(true);
        const [activeData, usedData] = await Promise.all([
          getActivePromotions(),
          getUsedPromotions(),
        ]);

        if (!cancelled) {
          setActive(activeData);
          setUsed(usedData);
        }
      } catch {
        if (!cancelled) {
          setError("Nao foi possivel carregar suas promocoes.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadPromotions();

    return () => {
      cancelled = true;
    };
  }, [user]);

  return (
    <div className="grid gap-6">
      <section className="rounded-[1.9rem] border border-[rgba(104,64,49,0.08)] bg-white p-6 shadow-[0_18px_40px_rgba(71,42,35,0.06)] md:p-8">
        <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[var(--color-accent)]">
          Benefícios do cliente
        </p>
        <h1 className="mt-3 text-3xl font-bold uppercase tracking-[0.08em] text-[var(--color-brown)]">
          Minhas promoções
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-muted)] md:text-base">
          Acompanhe as ofertas disponíveis para o seu cadastro, veja o que ainda pode ser ativado e o historico de beneficios que ja foram utilizados.
        </p>
      </section>

      {loading && (
        <div className="rounded-[1.9rem] border border-[rgba(104,64,49,0.08)] bg-white py-16 text-center shadow-[0_18px_40px_rgba(71,42,35,0.06)]">
          <p className="text-sm text-[var(--color-muted)]">Carregando promocoes...</p>
        </div>
      )}

      {error && (
        <div className="rounded-[1.9rem] border border-red-200 bg-red-50 py-16 text-center">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <section className="rounded-[1.9rem] border border-[rgba(104,64,49,0.08)] bg-white p-6 shadow-[0_18px_40px_rgba(71,42,35,0.06)] md:p-8">
          <PromocoesTabs active={active} used={used} />
        </section>
      )}
    </div>
  );
}
