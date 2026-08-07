"use client";

import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useMemo, useState, type ChangeEvent, type ComponentProps, type ReactNode } from "react";

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
  error,
  hint,
  allowPasswordToggle = false,
  type,
  ...inputProps
}: ComponentProps<"input"> & {
  label: string;
  className?: string;
  error?: string;
  hint?: string;
  allowPasswordToggle?: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  const shouldShowToggle = isPasswordField && allowPasswordToggle;
  const resolvedType = shouldShowToggle ? (showPassword ? "text" : "password") : type;
  const inputClassName = `${fieldInputClassName} ${shouldShowToggle ? "pr-12" : ""} ${error ? "border-[#a14b3b] focus:border-[#a14b3b] focus:shadow-[0_0_0_4px_rgba(161,75,59,0.14)]" : ""} ${className ?? ""}`.trim();
  const toggleLabel = useMemo(
    () => (showPassword ? `Ocultar ${label.toLowerCase()}` : `Mostrar ${label.toLowerCase()}`),
    [label, showPassword],
  );

  return (
    <label className={fieldLabelClassName}>
      <span>{label}</span>
      <div className="relative">
        <input {...inputProps} type={resolvedType} aria-invalid={Boolean(error)} className={inputClassName} />
        {shouldShowToggle ? (
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={toggleLabel}
            className="absolute inset-y-0 right-0 inline-flex w-12 items-center justify-center text-[var(--color-muted)] transition hover:text-[var(--color-brown)]"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        ) : null}
      </div>
      {error ? <span className="text-[0.78rem] font-medium leading-[1.35] text-[#a14b3b]">{error}</span> : null}
      {!error && hint ? <span className="text-[0.78rem] leading-[1.35] text-[var(--color-muted)]">{hint}</span> : null}
    </label>
  );
}

export function ConsentSection({
  children,
  privacyConsentChecked,
  onPrivacyConsentChange,
  privacyConsentError,
}: {
  children: ReactNode;
  privacyConsentChecked: boolean;
  onPrivacyConsentChange: (event: ChangeEvent<HTMLInputElement>) => void;
  privacyConsentError?: string;
}) {
  return (
    <fieldset className="mt-1 grid gap-3 rounded-[1.1rem] border border-[rgba(104,64,49,0.12)] bg-[rgba(255,255,255,0.7)] p-4">
      <legend className="px-1 text-[0.82rem] font-bold uppercase tracking-[0.16em] text-[var(--color-brown)]">
        Comunicação
      </legend>
      <p className="text-[0.84rem] leading-[1.45] text-[var(--color-muted)]">
        Escolha os canais autorizados para contato do ESM, com registro das preferências conforme a LGPD.
      </p>

      <div className="grid gap-2 md:grid-cols-3">{children}</div>

      <label className="inline-flex items-start gap-2.5 border-t border-[rgba(104,64,49,0.1)] pt-3 text-[0.84rem] leading-[1.35] text-var(--color-muted)">
        <input
          type="checkbox"
          name="privacyConsent"
          value="true"
          checked={privacyConsentChecked}
          onChange={onPrivacyConsentChange}
          aria-invalid={Boolean(privacyConsentError)}
        />
        <span>
          Concordo com a{" "}
          <Link
            href="https://marche.com.br/policies/privacy-policy?store_id=66677604431"
            target="_blank"
            rel="noreferrer"
            className="font-bold text-var(--color-brown) underline decoration-[rgba(104,64,49,0.35)] underline-offset-3 hover:text-var(--color-accent)"
          >
            política de privacidade
          </Link>
          .
        </span>
      </label>
      {privacyConsentError ? (
        <p className="text-[0.78rem] font-medium leading-[1.35] text-[#a14b3b]">{privacyConsentError}</p>
      ) : null}
    </fieldset>
  );
}

export function ConsentOption({
  name,
  title,
  description,
  checked,
  handleConsentChange,
}: {
  name: string;
  title: string;
  description: string;
  checked: boolean;
  handleConsentChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="grid min-h-[6.4rem] grid-rows-[auto_1fr] justify-items-center gap-2 rounded-[0.95rem] border border-[rgba(104,64,49,0.12)] bg-[rgba(255,255,255,0.86)] px-3 py-2.5 text-center text-[var(--color-muted)]">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name={name}
          value="true"
          checked={checked}
          onChange={handleConsentChange}
          className="translate-y-[-1px]"
        />
        <span className="text-[0.84rem] font-bold leading-[1.2] text-[var(--color-brown)]">{title}</span>
      </div>
      <span className="text-[0.78rem] leading-[1.35]">{description}</span>
    </label>
  );
}

export function SubmitButton({
  children,
  disabled,
  loading = false,
  type = "submit",
  className,
  ...buttonProps
}: ComponentProps<"button"> & {
  children: ReactNode;
  loading?: boolean;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`mt-0.5 inline-flex min-h-[3.15rem] items-center justify-center rounded-full bg-[var(--color-brown)] px-5 py-3 text-[0.84rem] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[var(--color-ink)] disabled:cursor-not-allowed disabled:opacity-60 ${className ?? ""}`.trim()}
      {...buttonProps}
    >
      <span className="inline-flex items-center gap-2">
        {loading ? (
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white"
            aria-hidden="true"
          />
        ) : null}
        <span>{children}</span>
      </span>
    </button>
  );
}

export function SecondaryButton({
  children,
  disabled,
  type = "button",
  className,
  ...buttonProps
}: ComponentProps<"button"> & {
  children: ReactNode;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex min-h-[3.15rem] items-center justify-center rounded-full border border-[rgba(104,64,49,0.18)] bg-transparent px-5 py-3 text-[0.84rem] font-bold uppercase tracking-[0.16em] text-[var(--color-brown)] transition hover:border-[var(--color-brown)] hover:bg-[rgba(104,64,49,0.04)] disabled:cursor-not-allowed disabled:opacity-60 ${className ?? ""}`.trim()}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

