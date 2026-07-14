"use client";

import { useForgotPasswordForm } from "@/hooks/use-forgot-password-form";

export function ForgotPasswordForm() {
  const { formData, isSubmitting, successMessage, handleChange, handleSubmit } =
    useForgotPasswordForm();

  return (
    <form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
      <label className="grid gap-2 text-[0.9rem] font-bold text-[var(--color-brown)]">
        <span>CPF</span>
        <input
          type="text"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          placeholder="000.000.000-00"
          inputMode="numeric"
          maxLength={14}
          autoComplete="username"
          className="w-full rounded-[0.95rem] border border-[rgba(104,64,49,0.16)] bg-white px-4 py-3 text-[0.95rem] text-[var(--color-body)] outline-none transition placeholder:text-[rgba(117,105,98,0.9)] focus:border-[var(--color-accent)] focus:shadow-[0_0_0_4px_rgba(213,166,66,0.14)]"
        />
      </label>

      <p className="text-[0.92rem] leading-6 text-[var(--color-muted)]">
        Se o CPF estiver vinculado a um cadastro valido, enviaremos um e-mail com o link para redefinir sua senha.
      </p>

      {successMessage ? (
        <div className="rounded-[1rem] border border-[rgba(92,129,82,0.18)] bg-[rgba(92,129,82,0.08)] px-4 py-3 text-[0.92rem] leading-6 text-[#3d5b34]">
          {successMessage}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="mt-1 inline-flex min-h-[3.15rem] items-center justify-center rounded-full bg-[var(--color-brown)] px-5 py-3 text-[0.84rem] font-bold uppercase tracking-[0.16em] text-white hover:bg-[var(--color-ink)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Enviando..." : "Enviar link de recuperacao"}
      </button>
    </form>
  );
}
