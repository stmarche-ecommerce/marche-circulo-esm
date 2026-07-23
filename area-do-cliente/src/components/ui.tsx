import type { ReactNode } from "react";

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mb-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-burgundy ${className}`}
    >
      {children}
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-card border border-line bg-paper-2 p-7 ${className}`}
    >
      {children}
    </section>
  );
}

export function UsageBar({
  used,
  total,
  label,
}: {
  used: number;
  total: number;
  label: string;
}) {
  const percent = Math.min(100, Math.round((used / total) * 100));
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="h-2 flex-1 overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-valuenow={used}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={label}
      >
        <div
          className="h-full rounded-full bg-burgundy"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="whitespace-nowrap font-mono text-xs text-burgundy-dark">
        {label}
      </div>
    </div>
  );
}
