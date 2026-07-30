import { historyEntries } from "@/data/mock-data";
import { Card, Eyebrow } from "@/components/ui";

export default function HistoryTab() {
  return (
    <div>
      <Eyebrow>Acompanhamento</Eyebrow>
      <h1 className="mb-2.5 font-display text-[32px] font-medium leading-tight md:text-[34px]">
        Histórico de benefícios usados
      </h1>
      <p className="mb-5 max-w-xl text-[15px] leading-relaxed text-[#5b4d40]">
        Todos os benefícios que você já utilizou.
      </p>
      <Card>
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
            {historyEntries.map((entry, index) => (
              <tr key={index}>
                <td
                  className={`py-3.5 text-[#3d2f24] ${
                    index !== historyEntries.length - 1
                      ? "border-b border-line"
                      : ""
                  }`}
                >
                  {entry.date}
                </td>
                <td
                  className={`py-3.5 ${
                    index !== historyEntries.length - 1
                      ? "border-b border-line"
                      : ""
                  }`}
                >
                  <span className="inline-block rounded-full bg-[#f1e6d6] px-2.5 py-1 text-[11.5px] font-medium text-burgundy-dark">
                    {entry.benefit}
                  </span>
                </td>
                <td
                  className={`py-3.5 text-[#3d2f24] ${
                    index !== historyEntries.length - 1
                      ? "border-b border-line"
                      : ""
                  }`}
                >
                  {entry.store}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
