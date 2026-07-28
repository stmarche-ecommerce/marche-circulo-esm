"use client";

import { navItems, currentUser } from "@/data/mock-data";
import type { TabId } from "@/types";

interface SidebarProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
}

export default function Sidebar({ activeTab, onSelectTab }: SidebarProps) {
  return (
    <aside className="flex h-screen w-full flex-shrink-0 flex-col justify-between bg-gradient-to-b from-sidebar-top to-sidebar-bottom px-6 py-7 text-[#f2e9e4] md:sticky md:top-0 md:h-screen md:w-[280px]">
      <div>
        <div className="mb-7 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-[10px] bg-gold text-lg">
            ✦
          </div>
          <div className="text-[13px] text-[#d8cdc6]">
            <b className="block text-[15px] font-medium text-white">
              Área do cliente
            </b>
            Círculo Santa Maria
          </div>
        </div>

        <div className="px-1 pb-2 text-xs text-[#c9bdb6]">
          Olá
          <b className="mt-0.5 block text-[15px] font-medium text-white">
            {currentUser.name}
          </b>
        </div>

        <nav className="mt-2 flex flex-col gap-1" aria-label="Navegação principal">
          {navItems.map((item) => {
            const isActive = item.id === activeTab;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                aria-current={isActive ? "page" : undefined}
                className={`focus-ring flex w-full items-center gap-2.5 rounded-[10px] px-3.5 py-3 text-left font-sans text-sm transition-colors ${
                  isActive
                    ? "bg-paper-2 font-medium text-ink"
                    : "text-[#e6ddd7] hover:bg-white/5"
                }`}
              >
                <span className="w-[18px] text-center opacity-90" aria-hidden="true">
                  {item.icon}
                </span>
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-[18px] text-[13px] leading-relaxed text-[#d8cdc6]">
          <span className="mb-2 block text-[11px] font-semibold tracking-[0.08em] text-gold">
            CURADORIA ATIVA
          </span>
          Seu acesso libera promoções sazonais, experiências exclusivas e
          conteúdos escolhidos pelo time Santa Maria.
        </div>
        <button
          type="button"
          className="focus-ring mt-3.5 w-full rounded-[10px] border border-white/[0.18] bg-transparent p-[11px] text-xs font-semibold tracking-[0.06em] text-[#f2e9e4]"
        >
          ⏻ SAIR
        </button>
      </div>
    </aside>
  );
}
