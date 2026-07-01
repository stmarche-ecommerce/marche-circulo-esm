import Link from "next/link";

export function LoginForm() {
  return (
    <form className="mt-5 grid gap-4">
      <label className="grid gap-2 text-[0.9rem] font-bold text-[var(--color-brown)]">
        <span>E-mail ou CPF</span>
        <input
          type="text"
          name="login"
          placeholder="seunome@email.com"
          className="w-full rounded-[0.95rem] border border-[rgba(104,64,49,0.16)] bg-white px-4 py-3 text-[0.95rem] text-[var(--color-body)] outline-none transition placeholder:text-[rgba(117,105,98,0.9)] focus:border-[var(--color-accent)] focus:shadow-[0_0_0_4px_rgba(213,166,66,0.14)]"
        />
      </label>

      <label className="grid gap-2 text-[0.9rem] font-bold text-[var(--color-brown)]">
        <span>Senha</span>
        <input
          type="password"
          name="password"
          placeholder="Digite sua senha"
          className="w-full rounded-[0.95rem] border border-[rgba(104,64,49,0.16)] bg-white px-4 py-3 text-[0.95rem] text-[var(--color-body)] outline-none transition placeholder:text-[rgba(117,105,98,0.9)] focus:border-[var(--color-accent)] focus:shadow-[0_0_0_4px_rgba(213,166,66,0.14)]"
        />
      </label>

      <div className="mt-1 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <label className="inline-flex items-center gap-2.5 text-[0.95rem] text-[var(--color-muted)]">
          <input type="checkbox" name="remember" />
          <span>Lembrar acesso</span>
        </label>

        <Link href="/criar-conta" className="text-[0.95rem] font-bold text-[var(--color-brown)] hover:text-[var(--color-accent)]">
          Esqueci minha senha
        </Link>
      </div>

      <button
        type="submit"
        className="mt-1 inline-flex min-h-[3.15rem] items-center justify-center rounded-full bg-[var(--color-brown)] px-5 py-3 text-[0.84rem] font-bold uppercase tracking-[0.16em] text-white hover:bg-[var(--color-ink)]"
      >
        Entrar
      </button>
    </form>
  );
}
