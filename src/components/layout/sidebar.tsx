"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Gift, Home, LogOut, Sparkles, UserCircle2 } from "lucide-react";
import { useAuth } from "@/app/context/auth-context";

const navigation = [
  { href: "/area-cliente", label: "Visao geral", icon: Home },
  { href: "/area-cliente/promocoes", label: "Promocoes", icon: Gift },
  { href: "/area-cliente/perfil", label: "Meu cadastro", icon: UserCircle2 },
];

interface SidebarProps {
  userName?: string;
}

export default function Sidebar({ userName }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  return (
    <aside className="flex w-full flex-col border-b border-[rgba(104,64,49,0.08)] bg-[linear-gradient(180deg,rgba(71,42,35,0.98),rgba(47,44,82,0.98))] px-5 py-6 text-white md:min-h-screen md:max-w-[320px] md:border-b-0 md:border-r md:px-6">
      <div className="rounded-[1.8rem] border border-white/10 bg-white/6 p-5 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(213,166,66,0.22)] text-[var(--color-accent)]">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            {/* <p className="text-[0.72rem] uppercase tracking-[0.28em] text-white/55">
              Circulo Santa Maria
            </p> */}
            <h2 className="text-lg font-bold tracking-[0.06em]">
              Área do cliente
            </h2>
          </div>
        </div>

        <div className="mt-2 rounded-[1.4rem]  border-white/10  p-4">
          <p className="mt-2 text-base font-semibold text-white">
            Olá, {userName || "Convidado"}
          </p>

        </div>
      </div>

      <nav className="mt-6 grid gap-2">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/area-cliente" && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive
                ? "bg-white text-[var(--color-brown-dark)] shadow-[0_18px_36px_rgba(0,0,0,0.14)]"
                : "text-white/72 hover:bg-white/8 hover:text-white"
                }`}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 rounded-[1.6rem] border border-[rgba(213,166,66,0.2)] bg-[rgba(213,166,66,0.08)] p-4 md:mt-auto">
        <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[var(--color-accent-soft)]">
          Curadoria ativa
        </p>
        <p className="mt-3 text-sm leading-6 text-white/78">
          Seu acesso libera promoções sazonais, experiências exclusivas e conteudos escolhidos pelo time Santa Maria.
        </p>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/16 px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white hover:bg-white/10"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </button>
      </div>
    </aside>
  );
}
