import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const fieldLabelClassName = "grid gap-[0.46rem] text-[0.9rem] font-bold text-[var(--color-brown)]";
const fieldInputClassName =
  "w-full rounded-[0.95rem] border border-[rgba(104,64,49,0.16)] bg-white px-[0.95rem] py-[0.8rem] text-[0.95rem] text-[var(--color-body)] outline-none transition placeholder:text-[rgba(117,105,98,0.9)] focus:border-[var(--color-accent)] focus:shadow-[0_0_0_4px_rgba(213,166,66,0.14)]";


export function FieldGrid({
  children,
  className = "lg:grid-cols-2",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`grid gap-[0.95rem] ${className}`}>{children}</div>;
}

export function Field({
  label,
  className,
  ...inputProps
}: ComponentProps<"input"> & {
  label: string;
  className?: string;
}) {
  return (
    <label className={fieldLabelClassName}>
      <span>{label}</span>
      <input {...inputProps} className={`${fieldInputClassName} ${className ?? ""}`.trim()} />
    </label>
  );
}

export function ConsentSection({ children }: { children: ReactNode }) {
  return (
    <fieldset className="mt-1 grid gap-3 rounded-[1.1rem] border border-[rgba(104,64,49,0.12)] bg-[rgba(255,255,255,0.7)] p-4">
      <legend className="px-1 text-[0.82rem] font-bold uppercase tracking-[0.16em] text-[var(--color-brown)]">
        Comunicacao
      </legend>
      <p className="text-[0.84rem] leading-[1.45] text-[var(--color-muted)]">
        Escolha os canais autorizados para contato do ESM, com registro das preferencias conforme a LGPD.
      </p>

      <div className="grid gap-2 md:grid-cols-3">{children}</div>

      <label className="inline-flex items-start gap-2.5 border-t border-[rgba(104,64,49,0.1)] pt-3 text-[0.84rem] leading-[1.35] text-[var(--color-muted)]">
        <input type="checkbox" name="privacyConsent" value="true" required />
        <span>
          Concordo com a{" "}
          <Link
            href="https://marche.com.br/policies/privacy-policy?store_id=66677604431"
            target="_blank"
            rel="noreferrer"
            className="font-bold text-[var(--color-brown)] underline decoration-[rgba(104,64,49,0.35)] underline-offset-3 hover:text-[var(--color-accent)]"
          >
            politica de privacidade
          </Link>
          .
        </span>
      </label>
    </fieldset>
  );
}

export function ConsentOption({
  name,
  title,
  description,
}: {
  name: string;
  title: string;
  description: string;
}) {
  return (
    <label className="grid min-h-[6.4rem] grid-rows-[auto_1fr] justify-items-center gap-2 rounded-[0.95rem] border border-[rgba(104,64,49,0.12)] bg-[rgba(255,255,255,0.86)] px-3 py-2.5 text-center text-[var(--color-muted)]">
      <div className="flex items-center gap-2">
        <input type="checkbox" name={name} value="true" className="translate-y-[-1px]" />
        <span className="text-[0.84rem] font-bold leading-[1.2] text-[var(--color-brown)]">{title}</span>
      </div>
      <span className="text-[0.78rem] leading-[1.35]">{description}</span>
    </label>
  );
}

export function SubmitButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="submit"
      className="mt-0.5 inline-flex min-h-[3.15rem] items-center justify-center rounded-full bg-[var(--color-brown)] px-5 py-3 text-[0.84rem] font-bold uppercase tracking-[0.16em] text-white hover:bg-[var(--color-ink)]"
    >
      {children}
    </button>
  );
}
