"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4 text-center">
      <div className="max-w-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-[#b1813a]">Algo saiu do esperado</p>
        <h2
          className="mt-4 text-3xl uppercase tracking-[0.18em] text-[#583729]"
          style={{ fontFamily: "CeraBold, sans-serif" }}
        >
          Nao foi possivel carregar esta pagina
        </h2>
        <button
          type="button"
          onClick={reset}
          className="mt-8 rounded border border-[#583729] px-6 py-3 text-sm uppercase tracking-[0.22em] text-[#583729] transition hover:bg-[#583729] hover:text-white"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
