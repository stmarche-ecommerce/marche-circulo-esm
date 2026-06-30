import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4 text-center">
      <div className="max-w-xl">
        <p className="font-bold text-[5rem] uppercase tracking-[0.3em] text-[#b1813a]">404</p>
        <h2
          className="mt-4 text-3xl uppercase tracking-[0.18em] text-[#583729]"
          style={{ fontFamily: "CeraBold, sans-serif" }}
        >
          Pagina não encontrada
        </h2>
        <p className="mt-4 text-base leading-7 text-[#6f6f6f]">
          O caminho solicitado não existe nesta migracao.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded border border-[#583729] px-6 py-3 text-sm uppercase tracking-[0.22em] text-[#583729] transition hover:bg-[#583729] hover:text-white"
        >
          Voltar para o inicio
        </Link>
      </div>
    </div>
  );
}
