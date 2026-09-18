
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PT_Sans } from "next/font/google";
import Image from "next/image";

const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

type RegulamentoModalProps = {
  open: boolean;
  onClose: () => void;
};

const REGULAMENTO_IMAGES_PATH = "/images/para-colecionar/regulamento";

const pages = [
  { desktop: `${REGULAMENTO_IMAGES_PATH}/pagina-01-desktop.png`, mobile: `${REGULAMENTO_IMAGES_PATH}/pagina-01-mobile.png`, width: 513, height: 693, alt: "Regulamento - página 1" },
  { desktop: `${REGULAMENTO_IMAGES_PATH}/pagina-02-desktop.png`, mobile: `${REGULAMENTO_IMAGES_PATH}/pagina-02-mobile.png`, width: 517, height: 699, alt: "Regulamento - página 2" },
  { desktop: `${REGULAMENTO_IMAGES_PATH}/pagina-03-desktop.png`, mobile: `${REGULAMENTO_IMAGES_PATH}/pagina-03-mobile.png`, width: 516, height: 696, alt: "Regulamento - página 3" },
  { desktop: `${REGULAMENTO_IMAGES_PATH}/pagina-04-desktop.png`, mobile: `${REGULAMENTO_IMAGES_PATH}/pagina-04-mobile.png`, width: 520, height: 703, alt: "Regulamento - página 4" },
  { desktop: `${REGULAMENTO_IMAGES_PATH}/pagina-05-desktop.png`, mobile: `${REGULAMENTO_IMAGES_PATH}/pagina-05-mobile.png`, width: 521, height: 705, alt: "Regulamento - página 5" },
  { desktop: `${REGULAMENTO_IMAGES_PATH}/pagina-06-desktop.png`, mobile: `${REGULAMENTO_IMAGES_PATH}/pagina-06-mobile.png`, width: 519, height: 701, alt: "Regulamento - página 6" },
  { desktop: `${REGULAMENTO_IMAGES_PATH}/pagina-07-desktop.png`, mobile: `${REGULAMENTO_IMAGES_PATH}/pagina-07-mobile.png`, width: 516, height: 697, alt: "Regulamento - página 7" },
  { desktop: `${REGULAMENTO_IMAGES_PATH}/pagina-08-desktop.png`, mobile: `${REGULAMENTO_IMAGES_PATH}/pagina-08-mobile.png`, width: 521, height: 704, alt: "Regulamento - página 8" },
  { desktop: `${REGULAMENTO_IMAGES_PATH}/pagina-09-desktop.png`, mobile: `${REGULAMENTO_IMAGES_PATH}/pagina-09-mobile.png`, width: 517, height: 699, alt: "Regulamento - página 9" },
  { desktop: `${REGULAMENTO_IMAGES_PATH}/pagina-10-desktop.png`, mobile: `${REGULAMENTO_IMAGES_PATH}/pagina-10-mobile.png`, width: 518, height: 699, alt: "Regulamento - página 10" },
  { desktop: `${REGULAMENTO_IMAGES_PATH}/pagina-11-desktop.png`, mobile: `${REGULAMENTO_IMAGES_PATH}/pagina-11-mobile.png`, width: 519, height: 701, alt: "Regulamento - página 11" },
  { desktop: `${REGULAMENTO_IMAGES_PATH}/pagina-12-desktop.png`, mobile: `${REGULAMENTO_IMAGES_PATH}/pagina-12-mobile.png`, width: 518, height: 699, alt: "Regulamento - página 12" },
];

export function RegulamentoModal({ open, onClose }: RegulamentoModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className={`${ptSans.className} fixed inset-0 z-[9999] flex items-center justify-center text-left bg-black/70 p-0 sm:p-4`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="regulamento-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative flex h-dvh w-180 flex-col p-5 overflow-hidden bg-white sm:h-[94vh] sm:max-w-6xl sm:rounded-2xl sm:shadow-2xl">
        <header className="flex shrink-0 items-center justify-between border-b border-zinc-200 bg-white px-4 py-3 sm:px-6">
          <div>

            <h2 id="regulamento-title" className="text-lg text-center font-bold text-zinc-900 sm:text-xl">
              Regulamento
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar regulamento"
            className="grid size-10 shrink-0 place-items-center rounded-full text-3xl leading-none text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto bg-zinc-100">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 p-3 sm:gap-5 sm:p-6">
            {pages.map((page, index) => (
              <div key={page.desktop} className="w-full overflow-hidden bg-white shadow-sm">
                <picture>
                  <source media="(max-width: 767px)" srcSet={page.mobile} />
                  <Image
                    src={page.desktop}
                    alt={page.alt}
                    className="block h-auto w-full"
                    width={page.width}
                    height={page.height}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </picture>
              </div>
            ))}
          </div>
        </main>

        <footer className="flex shrink-0 items-center justify-between border-t border-zinc-200 bg-white px-4 py-3 sm:px-6">
          <span className="text-xs text-zinc-500">12 páginas</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full cursor-pointer bg-[#5d3829] px-5 py-2 text-sm font-bold text-white transition hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
          >
            Fechar
          </button>
        </footer>
      </div>
    </div>,
    document.body
  );
}

export function RegulamentoLink({
  label = "Regulamento da campanha",
  className,
}: {
  label?: string;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} className={className}>
        {label}
      </button>
      <RegulamentoModal open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

