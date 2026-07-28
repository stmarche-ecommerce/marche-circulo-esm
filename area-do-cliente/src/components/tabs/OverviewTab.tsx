"use client";

import { benefits, currentUser, historyEntries } from "@/data/mock-data";
import type { TabId } from "@/types";
import { Card, Eyebrow, UsageBar } from "@/components/ui";

interface OverviewTabProps {
  onNavigate: (tab: TabId) => void;
}

const activePromotionsCount = 3;
const usedBenefitsCount = historyEntries.length > 0 ? 1 : 0;

export default function OverviewTab({ onNavigate }: OverviewTabProps) {
  const firstName = currentUser.name.split(" ")[0];

  return (
    <div>
      <div className="mb-8 flex flex-col items-start gap-6 md:flex-row">
        <div className="flex-1">
          <Eyebrow>Painel exclusivo</Eyebrow>
          <h1 className="mb-3.5 max-w-xl font-display text-[32px] font-medium leading-tight md:text-[38px]">
            {firstName}, seja bem-vindo ao Círculo Santa Maria.
          </h1>
          <p className="mb-5 max-w-lg text-[15px] leading-relaxed text-[#5b4d40]">
            Aqui você acompanha seus benefícios, descobre a curadoria de
            ofertas e experiências pensadas para quem faz parte do Círculo.
          </p>
          <button
            type="button"
            onClick={() => onNavigate("promocoes")}
            className="focus-ring inline-flex items-center gap-2 rounded-[10px] bg-burgundy px-[22px] py-[13px] text-xs font-semibold tracking-[0.06em] text-white transition-opacity hover:opacity-90"
          >
            VEJA AS PROMOÇÕES DESSE MÊS →
          </button>
        </div>
        <div className="w-full flex-shrink-0 md:w-[260px]">
          <div className="flex flex-col gap-3.5">
            <div className="rounded-2xl border border-line bg-paper-2 p-4">
              <div className="mb-1.5 text-xs text-muted">
                Promoções ativas
              </div>
              <div className="font-display text-[26px] font-medium">
                {activePromotionsCount}
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-paper-2 p-4">
              <div className="mb-1.5 text-xs text-muted">
                Benefícios usados
              </div>
              <div className="font-display text-[26px] font-medium">
                {usedBenefitsCount}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Card className="mb-6">
        <Eyebrow>Meus benefícios</Eyebrow>
        <h2 className="mb-[18px] mt-0.5 font-display text-[22px] font-medium">
          Benefícios ativos
        </h2>
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="rounded-2xl border border-line bg-[#fbf7ee] p-5"
            >
              <h3 className="mb-2 font-display text-[17px] font-medium">
                {benefit.title}
              </h3>
              <p className="mb-3.5 text-[13px] leading-relaxed text-[#5b4d40]">
                {benefit.description}
              </p>
              <UsageBar
                used={benefit.used}
                total={benefit.total}
                label={`${benefit.used} de ${benefit.total} usados`}
              />
            </div>
          ))}
        </div>
        <div className="mt-[18px] border-t border-line pt-3.5 text-[12.5px] text-muted">
          Seus benefícios são liberados automaticamente a partir do cadastro.
          Não é necessário ativar nada — eles já estão disponíveis na sua
          próxima visita.{" "}
          <button
            type="button"
            onClick={() => onNavigate("beneficios")}
            className="focus-ring cursor-pointer text-burgundy-dark underline"
          >
            Ver regras completas →
          </button>
        </div>
      </Card>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <Eyebrow>Acompanhamento</Eyebrow>
          <h2 className="mb-[18px] mt-0.5 font-display text-[22px] font-medium">
            Últimos benefícios usados
          </h2>
          <table className="w-full border-collapse text-[13.5px]">
            <thead>
              <tr>
                <th className="border-b border-line pb-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">
                  Data
                </th>
                <th className="border-b border-line pb-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">
                  Benefício
                </th>
                <th className="border-b border-line pb-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">
                  Loja
                </th>
              </tr>
            </thead>
            <tbody>
              {historyEntries.slice(0, 1).map((entry, index) => (
                <tr key={index}>
                  <td className="border-b-0 py-3.5 text-[#3d2f24]">
                    {entry.date}
                  </td>
                  <td className="border-b-0 py-3.5">
                    <span className="inline-block rounded-full bg-[#f1e6d6] px-2.5 py-1 text-[11.5px] font-medium text-burgundy-dark">
                      {entry.benefit}
                    </span>
                  </td>
                  <td className="border-b-0 py-3.5 text-[#3d2f24]">
                    {entry.store}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pt-2 text-[12.5px] text-muted">
            <button
              type="button"
              onClick={() => onNavigate("historico")}
              className="focus-ring cursor-pointer text-burgundy-dark underline"
            >
              Ver histórico completo →
            </button>
          </div>
        </Card>

        <Card>
          <Eyebrow>Primeiros passos</Eyebrow>
          <h2 className="mb-[18px] mt-0.5 font-display text-[22px] font-medium">
            O que fazer agora
          </h2>
          <div className="flex flex-col gap-3">
            {[
              "Aproveite seus benefícios de boas-vindas já na próxima visita.",
              "Explore as ofertas sazonais em promoções.",
              "Use o painel para acompanhar benefícios já utilizados.",
            ].map((text, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-xl border border-line bg-[#fbf7ee] px-5 py-4 text-sm text-[#3d2f24]"
              >
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-line bg-paper-2 text-xs font-semibold text-burgundy">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {text}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <section className="rounded-2xl border border-dashed border-amber-line bg-amber-bg p-6">
        <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-text">
          Em breve
        </div>
        <h2 className="mb-2.5 mt-1.5 font-display text-xl font-medium text-[#5c3d18]">
          Bazar Santa Maria
        </h2>
        <p className="max-w-lg text-sm leading-relaxed text-[#6b4a20]">
          Em breve, você poderá trocar pontos por itens exclusivos do Bazar
          Santa Maria. Fique de olho — essa novidade está a caminho.
        </p>
      </section>
    </div>
  );
}
