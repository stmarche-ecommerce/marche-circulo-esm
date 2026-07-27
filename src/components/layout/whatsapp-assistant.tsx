"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5511958187139";

export function WhatsAppAssistant() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {isOpen ? (
        <div className="w-75 overflow-hidden rounded-[22px] border border-[#eadfce] bg-[#fffaf3] shadow-[0_24px_60px_rgba(68,44,22,0.18)]">
          <div className="flex items-center justify-between bg-[#0f6b58] px-4 py-3 text-white">
            <div className="flex items-center gap-3 text-[15px] font-semibold">
              <span className="h-2.5 w-2.5 rounded-full bg-[#37d366]" />
              Assistente Santa Maria
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="focus-ring rounded-full p-1 text-white/80 hover:bg-white/10 hover:text-white"
              aria-label="Fechar assistente"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4 p-4">
            <div className="rounded-r-2xl rounded-b-2xl bg-[#efeee8] px-4 py-3 font-normal text-[12.5px] leading-[1.55] text-[#2f241c]">
              Olá, Kayk! 👋 Posso te ajudar a pedir seu delivery agora mesmo. Quer
              que eu já separe seus itens favoritos?
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="focus-ring flex min-h-12 items-center justify-center rounded-xl bg-[#2ecf61] px-4 text-[14px] font-semibold text-white transition hover:bg-[#25bf57]"
            >
              📲 Abrir no WhatsApp
            </a>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="focus-ring flex h-15 w-15 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_18px_34px_rgba(37,211,102,0.35)] transition hover:scale-[1.03] hover:bg-[#1fc05b]"
        aria-label={isOpen ? "Ocultar assistente do WhatsApp" : "Mostrar assistente do WhatsApp"}
      >
        <MessageCircle className="h-7 w-7 fill-white/90" />
      </button>
    </div>
  );
}
