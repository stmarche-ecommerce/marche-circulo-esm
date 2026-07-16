"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ArrowRight, Gift, Sparkles, TicketPercent } from "lucide-react";
import { useAuth } from "@/app/context/auth-context";
import { getActivePromotions, getUsedPromotions } from "@/services/promotions";

const highlights = [
  "Padaria artesanal",
  "Adega selecionada",
  "Brunch e experiências",
];

export default function AreaClientePage() {
  const { user } = useAuth();
  const [activeCount, setActiveCount] = useState(0);
  const [usedCount, setUsedCount] = useState(0);

  useEffect(() => {
    if (!user) {
      return;
    }

    let cancelled = false;

    async function loadSummary() {
      const [active, used] = await Promise.all([
        getActivePromotions(),
        getUsedPromotions(),
      ]);

      if (!cancelled) {
        setActiveCount(active.length);
        setUsedCount(used.length);
      }
    }

    void loadSummary();

    return () => {
      cancelled = true;
    };
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <div className="grid gap-6">
      <section className="overflow-hidden rounded-[2rem] border border-[rgba(104,64,49,0.08)] bg-[linear-gradient(135deg,rgba(255,251,245,0.96),rgba(245,239,232,0.94))] p-6 shadow-[0_24px_60px_rgba(71,42,35,0.08)] md:p-8">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
          <div>
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.34em] text-[var(--color-accent)]">
              Painel exclusivo
            </p>
            <h1 className="mt-4 max-w-3xl text-3xl font-bold uppercase tracking-[0.08em] text-[var(--color-brown)] md:text-5xl md:leading-[1.02]">
              {user.name ? `${user.name}, seu circulo esta ativo.` : "Seu circulo esta ativo."}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--color-muted)] md:text-lg">
              Um espaço interno com benefícios de boas-vindas, curadoria de ofertas e experiências disponíveis para o seu cadastro recém-aprovado.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[rgba(104,64,49,0.12)] bg-white px-4 py-2 text-sm text-[var(--color-brown)] shadow-[0_10px_22px_rgba(71,42,35,0.05)]"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/area-cliente/promocoes"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brown)] px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white hover:bg-[var(--color-ink)]"
              >
                Ver promoções
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <article className="rounded-[1.8rem] bg-[var(--color-brown-dark)] p-5 text-white shadow-[0_22px_44px_rgba(47,44,82,0.24)]">
              <div className="flex items-center justify-between">
                <span className="text-[0.72rem] uppercase tracking-[0.24em] text-white/55">
                  Status
                </span>
                <Sparkles className="h-4 w-4 text-[var(--color-accent)]" />
              </div>
              <p className="mt-4 text-2xl font-bold">Cadastro confirmado</p>
              <p className="mt-2 text-sm leading-6 text-white/70">
                Seu acesso já pode navegar pela curadoria e pelos benefícios do Círculo Santa Maria.
              </p>
            </article>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
              <article className="rounded-[1.8rem] border border-[rgba(104,64,49,0.08)] bg-white p-5 shadow-[0_18px_40px_rgba(71,42,35,0.06)]">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-[rgba(213,166,66,0.12)] p-3 text-[var(--color-accent)]">
                    <Gift className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--color-muted)]">Promocoes ativas</p>
                    <p className="text-3xl font-bold text-[var(--color-brown)]">{activeCount}</p>
                  </div>
                </div>
              </article>

              <article className="rounded-[1.8rem] border border-[rgba(104,64,49,0.08)] bg-white p-5 shadow-[0_18px_40px_rgba(71,42,35,0.06)]">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-[rgba(71,42,35,0.08)] p-3 text-[var(--color-brown)]">
                    <TicketPercent className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--color-muted)]">Beneficios usados</p>
                    <p className="text-3xl font-bold text-[var(--color-brown)]">{usedCount}</p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-[1.8rem] border border-[rgba(104,64,49,0.08)] bg-white p-6 shadow-[0_18px_40px_rgba(71,42,35,0.06)]">
          <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[var(--color-accent)]">
            Primeiros passos
          </p>
          <h2 className="mt-3 text-2xl font-bold uppercase tracking-[0.06em] text-[var(--color-brown)]">
            O que fazer agora
          </h2>
          <div className="mt-6 grid gap-4">
            {[
              "Ative sua promoção de boas-vindas na próxima visita.",
              "Explore as ofertas sazonais em promoções.",
              "Use o painel para acompanhar benefícios já utilizados.",
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-start gap-4 rounded-[1.4rem] bg-[var(--color-surface)] px-4 py-4"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-[var(--color-brown)]">
                  0{index + 1}
                </div>
                <p className="text-sm leading-7 text-[var(--color-body)]">{item}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[1.8rem] border border-[rgba(104,64,49,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(242,235,227,0.96))] p-6 shadow-[0_18px_40px_rgba(71,42,35,0.06)]">
          <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[var(--color-accent)]">
            Destaque do dia
          </p>
          <h2 className="mt-3 text-2xl font-bold uppercase tracking-[0.06em] text-[var(--color-brown)]">
            Curadoria brunch
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
            Seu cadastro já entrou na janela de benefícios para experiências de brunch, adega e empório. O painel de promoções traz os detalhes completos para resgate.
          </p>
          <Link
            href="/area-cliente/promocoes"
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-[var(--color-brown)] hover:text-[var(--color-accent)]"
          >
            Abrir painel de benefícios
            <ArrowRight className="h-4 w-4" />
          </Link>
        </article>
      </section>
    </div>
  );
}
