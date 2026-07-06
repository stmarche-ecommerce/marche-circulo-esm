"use client";

import { useAuth } from "@/app/context/auth-context";

export default function PerfilPage() {
  const { user } = useAuth();

  return (
    <section className="rounded-[1.9rem] border border-[rgba(104,64,49,0.08)] bg-white p-6 shadow-[0_18px_40px_rgba(71,42,35,0.06)] md:p-8">
      <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[var(--color-accent)]">
        Meu cadastro
      </p>
      <h1 className="mt-3 text-3xl font-bold uppercase tracking-[0.08em] text-[var(--color-brown)]">
        Dados do cliente
      </h1>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.4rem] bg-[var(--color-surface)] p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
            Nome
          </p>
          <p className="mt-3 text-lg font-semibold text-[var(--color-brown)]">
            {user?.name || "Cliente Santa Maria"}
          </p>
        </div>

        <div className="rounded-[1.4rem] bg-[var(--color-surface)] p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
            E-mail
          </p>
          <p className="mt-3 text-lg font-semibold text-[var(--color-brown)]">
            {user?.email || "Nao informado"}
          </p>
        </div>
      </div>
    </section>
  );
}
