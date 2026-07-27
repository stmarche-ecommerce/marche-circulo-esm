"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CircleUserRound,
  Gift,
  History,
  House,
  LogOut,
  Sparkles,
  TicketPercent,
  UserRound,
} from "lucide-react";
import { clientPanelClasses as styles } from "./client-panel-classes";
import { useAuth } from "@/app/context/auth-context";

const navigation = [
  { href: "/area-cliente", label: "Visão geral", icon: House, id: "geral" },
  {
    href: "/area-cliente/beneficios",
    label: "Benefícios",
    icon: Gift,
    id: "beneficios",
  },
  {
    href: "/area-cliente/promocoes",
    label: "Promoções",
    icon: TicketPercent,
    id: "promocoes",
  },
  {
    href: "/area-cliente/historico",
    label: "Histórico",
    icon: History,
    id: "historico",
  },
  {
    href: "/area-cliente/perfil",
    label: "Meu cadastro",
    icon: UserRound,
    id: "cadastro",
  },
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
  userEmail?: string;
}

export default function Sidebar({ userName }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const activeTab = getActiveTab(pathname);
  const displayName = userName || "Convidado";

  function displayNameLimit(name: string, limit = 15) {
    if (name.length <= limit) {
      return name
    }

    return name.slice(0, limit) + '...';
  }

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  return (
    <aside className={styles.sidebar}>
      <div>
        <div className={styles.brand}>
          <div className={styles.brandIcon}>
            <Sparkles className="h-4 w-4" />
          </div>
          <div className={styles.brandText}>
            <b className={styles.brandTextStrong}>Círculo Santa Maria</b>
          </div>
        </div>

        <div className={styles.profileCard}>
          <div className={styles.profileAvatar}>
            <CircleUserRound className="h-6 w-6" />
          </div>
          <div className={styles.profileMeta}>
            <div className={styles.profileName}>{displayNameLimit(displayName)}</div>
            <div className={styles.profileSince}>
              Membro do Círculo desde:
              <br />
              Jul/2026
            </div>
          </div>
        </div>

        <nav className={styles.sidebarNav} aria-label="Navegação principal">
          {navigation.map((item) => {
            const isActive = item.id === activeTab;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ""
                  }`}
              >
                <span className={styles.navIcon} aria-hidden="true">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div>
        <button type="button" onClick={handleLogout} className={styles.signout}>
          <LogOut className="h-4 w-4" /> SAIR
        </button>
      </div>
    </aside>
  );
}
