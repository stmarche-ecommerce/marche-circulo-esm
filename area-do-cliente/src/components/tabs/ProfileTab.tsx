import { currentUser } from "@/data/mock-data";
import { Card, Eyebrow } from "@/components/ui";

export default function ProfileTab() {
  const fields = [
    { label: "Nome", value: currentUser.name },
    { label: "E-mail", value: currentUser.email },
    { label: "Telefone", value: currentUser.phone },
    { label: "Membro desde", value: currentUser.memberSince },
  ];

  return (
    <div>
      <Eyebrow>Meu cadastro</Eyebrow>
      <h1 className="mb-2.5 font-display text-[32px] font-medium leading-tight md:text-[34px]">
        Seus dados
      </h1>
      <p className="mb-5 max-w-xl text-[15px] leading-relaxed text-[#5b4d40]">
        Informações do seu cadastro no Círculo Santa Maria.
      </p>
      <Card>
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
          {fields.map((field) => (
            <div
              key={field.label}
              className="rounded-xl border border-line bg-[#fbf7ee] p-4"
            >
              <div className="mb-1.5 text-[11px] uppercase tracking-[0.05em] text-muted">
                {field.label}
              </div>
              <div className="text-[15px] text-ink">{field.value}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
