import { benefits } from "@/data/mock-data";
import { Eyebrow, UsageBar } from "@/components/ui";

export default function BenefitsTab() {
  return (
    <div>
      <Eyebrow>Meus benefícios</Eyebrow>
      <h1 className="mb-2.5 font-display text-[32px] font-medium leading-tight md:text-[34px]">
        Seus benefícios do Círculo
      </h1>
      <p className="mb-5 max-w-xl text-[15px] leading-relaxed text-[#5b4d40]">
        Liberados automaticamente a partir do seu cadastro. Não é preciso
        ativar nada — basta usar na sua próxima visita.
      </p>

      {benefits.map((benefit) => (
        <div
          key={benefit.id}
          className="mb-5 rounded-card border border-line bg-paper-2 p-7"
        >
          <div className="mb-[18px] flex items-start justify-between gap-5">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#fbf1e2] text-xl text-burgundy-dark">
                {benefit.icon}
              </div>
              <h2 className="font-display text-[22px] font-medium">
                {benefit.title}
              </h2>
            </div>
          </div>

          <div className="mb-[18px] grid grid-cols-1 gap-3.5 sm:grid-cols-3">
            {benefit.rules.map((rule) => (
              <div
                key={rule.label}
                className="rounded-xl border border-line bg-[#fbf7ee] p-4"
              >
                <div className="mb-1.5 text-[11px] uppercase tracking-[0.05em] text-muted">
                  {rule.label}
                </div>
                <div className="font-display text-lg font-medium">
                  {rule.value}
                </div>
              </div>
            ))}
          </div>

          <div className="mb-[18px]">
            <UsageBar
              used={benefit.used}
              total={benefit.total}
              label={`${benefit.used} de ${benefit.total} usados este mês`}
            />
          </div>

          <div className="border-t border-line pt-3.5 text-[13px] leading-relaxed text-[#5b4d40]">
            {benefit.note}
          </div>
        </div>
      ))}

      <div className="mt-2 rounded-2xl border border-line bg-[#fbf7ee] p-5 text-[13px] leading-relaxed text-[#5b4d40]">
        Todos os benefícios do Círculo Santa Maria são habilitados
        automaticamente a partir do seu cadastro. Não há nenhuma ação de
        ativação necessária — é só aproveitar.
      </div>
    </div>
  );
}
