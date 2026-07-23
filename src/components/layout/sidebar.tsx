"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import styles from "./client-panel.module.css";
import { useAuth } from "@/app/context/auth-context";

const navigation = [
  { href: "/area-cliente", label: "Visão geral", icon: "⌂", id: "geral" },
  { href: "/area-cliente/beneficios", label: "Benefícios", icon: "▤", id: "beneficios" },
  { href: "/area-cliente/promocoes", label: "Promoções", icon: "▥", id: "promocoes" },
  { href: "/area-cliente/historico", label: "Histórico", icon: "◔", id: "historico" },
  { href: "/area-cliente/perfil", label: "Meu cadastro", icon: "○", id: "cadastro" },
] as const;

type TabId = (typeof navigation)[number]["id"];

function getActiveTab(pathname: string | null): TabId {
  if (pathname?.startsWith("/area-cliente/beneficios")) {
    return "beneficios";
  }

  if (pathname?.startsWith("/area-cliente/promocoes")) {
    return "promocoes";
  }

  if (pathname?.startsWith("/area-cliente/historico")) {
    return "historico";
  }

  if (pathname?.startsWith("/area-cliente/perfil")) {
    return "cadastro";
  }

  return "geral";
}

interface SidebarProps {
  userName?: string;
}

export default function Sidebar({ userName }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const activeTab = getActiveTab(pathname);

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  return (
    <aside className={styles.sidebar}>
      <div>
        <div className={styles.brand}>
          <div className={styles.brandIcon}>✦</div>
          <div className={styles.brandText}>
            <b className={styles.brandTextStrong}>Área do cliente</b>
            Círculo Santa Maria
          </div>
        </div>

        <div className={styles.greeting}>
          Olá
          <b className={styles.greetingStrong}>{userName || "Convidado"}</b>
        </div>

        <nav className={styles.sidebarNav} aria-label="Navegação principal">
          {navigation.map((item) => {
            const isActive = item.id === activeTab;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div>
        <div className={styles.curadoriaBox}>
          <span className={styles.curadoriaEyebrow}>CURADORIA ATIVA</span>
          Seu acesso libera promoções sazonais, experiências exclusivas e conteúdos escolhidos pelo time Santa Maria.
        </div>
        <button type="button" onClick={handleLogout} className={styles.signout}>
          <LogOut className="inline-block h-4 w-4" /> SAIR
        </button>
      </div>
    </aside>
  );
}
