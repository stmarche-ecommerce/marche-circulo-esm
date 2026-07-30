"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { Wine } from "lucide-react";
import { clientPanelClasses as styles } from "./client-panel-classes";
import { useAuth } from "@/app/context/auth-context";
import { type FilterValue, type TabId } from "@/types/client";
import {
  benefits,
  historyEntries,
  promotionCategories,
  promotionsReference,
} from "@/mocks";

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

function usageWidth(used: number, total: number) {
  if (total <= 0) {
    return "0%";
  }

  return `${Math.min(100, Math.round((used / total) * 100))}%`;
}

export default function ClientPanel() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [filter, setFilter] = useState<FilterValue>("todas");

  const activeTab = getActiveTab(pathname);
  const firstName = user?.name?.trim().split(/\s+/)[0] || "Cliente";
  const visibleCategories = useMemo(
    () =>
      promotionCategories.filter(
        (category) => filter === "todas" || category.id === filter,
      ),
    [filter],
  );

  const profileFields = [
    { label: "Nome", value: user?.name || "Kayk Marques" },
    { label: "E-mail", value: user?.email || "kayk.marques@email.com" },
    { label: "Telefone", value: "(11) 9 0000-0000" },
    { label: "Membro desde", value: "Julho de 2026" },
  ];

  return (
    <div className={styles.panelRoot}>
      <main className={styles.main}>
        {activeTab === "geral" ? (
          <div>
            <div className={styles.heroRow}>
              <div className={styles.heroLeft}>
                <div className={styles.eyebrow}>Painel exclusivo</div>
                <h1 className={styles.heroTitle}>
                  {firstName}, seja bem-vindo ao Círculo Santa Maria.
                </h1>
                <p className={styles.heroSub}>
                  Aqui você acompanha seus benefícios, descobre a curadoria de
                  ofertas e experiências pensadas para quem faz parte do Círculo.
                </p>
                <Link
                  href="/area-cliente/promocoes"
                  className={styles.primaryButton}
                >
                  VEJA AS PROMOÇÕES DESSE MÊS →
                </Link>
              </div>
            </div>

            <section className={styles.highlightCard}>
              <div className={styles.highlightCopy}>
                <div className={styles.highlightEyebrow}>Destaque do mês</div>
                <h2 className={styles.highlightTitle}>
                  Curadoria de Adega — até 39% off
                </h2>
                <p className={styles.highlightText}>
                  Rótulos selecionados para o Círculo, direto da campanha deste mês.
                </p>
              </div>
              <div className={styles.highlightIcon} aria-hidden="true">
                <Wine className="h-12 w-12" strokeWidth={1.8} />
              </div>
            </section>

            <section className={styles.card}>
              <div className={styles.eyebrow}>Meus benefícios</div>
              <h2 className={styles.cardTitle}>Benefícios ativos</h2>
              <div className={styles.benefitsGrid}>
                {benefits.map((benefit) => (
                  <div key={benefit.id} className={styles.benefitCard}>
                    <h3 className={styles.benefitCardTitle}>{benefit.title}</h3>
                    <p className={styles.benefitCardText}>
                      {benefit.description}
                    </p>
                    <div className={styles.benefitUsage}>
                      <div className={styles.usageTrack}>
                        <div
                          className={styles.usageFill}
                          style={{
                            width: usageWidth(benefit.used, benefit.total),
                          }}
                        />
                      </div>
                      <div className={styles.usageLabel}>
                        {benefit.used} de {benefit.total} usadas
                      </div>
                    </div>
                    <button type="button" className={styles.benefitAction}>
                      ATIVAR NO APP
                    </button>
                  </div>
                ))}
              </div>
              <div className={styles.footnote}>
                Seus benefícios são liberados a partir do cadastro.{" "}
                <Link
                  href="/area-cliente/beneficios"
                  className={styles.inlineAction}
                >
                  Ver regras completas →
                </Link>
              </div>
            </section>

            <section className={styles.historyCard}>
              <div className={styles.eyebrow}>Acompanhamento</div>
              <h2 className={styles.cardTitle}>Últimos benefícios usados</h2>
              <div className={styles.historyTableWrap}>
                <table className={styles.historyTable}>
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Benefício</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyEntries.slice(0, 1).map((entry) => (
                      <tr key={`${entry.date}-${entry.benefit}`}>
                        <td>{entry.date}</td>
                        <td>
                          <span className={styles.tag}>{entry.benefit}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="pt-5 text-[12.5px] text-[#8a7d6f]">
                <Link
                  href="/area-cliente/historico"
                  className={styles.inlineAction}
                >
                  Ver histórico completo →
                </Link>
              </div>
            </section>

            <section className={styles.bazarCard}>
              <div className={styles.eyebrow}>Em breve</div>
              <h2 className={styles.bazarTitle}>Bazar Santa Maria</h2>
              <p className={styles.bazarText}>
                Em breve, você poderá trocar pontos por itens exclusivos do Bazar
                Santa Maria. Fique de olho, essa novidade está a caminho.
              </p>
            </section>
          </div>
        ) : null}

        {activeTab === "beneficios" ? (
          <div>
            <div className={styles.eyebrow}>Meus benefícios</div>
            <h1 className={styles.pageTitle}>Seus benefícios do Círculo</h1>
            <p className={styles.pageSub}>
              Liberados automaticamente a partir do seu cadastro. Não é preciso
              ativar nada, basta usar na sua próxima visita.
            </p>

            {benefits.map((benefit) => (
              <div key={benefit.id} className={styles.benefitBlock}>
                <div className={styles.benefitHead}>
                  <div className={styles.benefitTitleRow}>
                    <div className={styles.benefitIcon}>{benefit.icon}</div>
                    <h2 className={styles.benefitBlockTitle}>{benefit.title}</h2>
                  </div>
                </div>
                <div className={styles.ruleGrid}>
                  {benefit.rules.map((rule) => (
                    <div key={rule.label} className={styles.rule}>
                      <div className={styles.ruleLabel}>{rule.label}</div>
                      <div className={styles.ruleValue}>{rule.value}</div>
                    </div>
                  ))}
                </div>
                <div className={styles.benefitUsage}>
                  <div className={styles.usageTrack}>
                    <div
                      className={styles.usageFill}
                      style={{
                        width: usageWidth(benefit.used, benefit.total),
                      }}
                    />
                  </div>
                  <div className={styles.usageLabel}>
                    {benefit.used} de {benefit.total} usados este mês
                  </div>
                </div>
                <div className={styles.benefitNote}>{benefit.note}</div>
                <div className={styles.benefitActionRow}>
                  <button type="button" className={styles.benefitAction}>
                    ATIVAR NO APP
                  </button>
                </div>
              </div>
            ))}

            <div className={styles.footnoteBlock}>
              Todos os benefícios do Círculo Santa Maria são habilitados
              automaticamente a partir do seu cadastro. Não há nenhuma ação de
              ativação necessária, é só aproveitar.
            </div>
          </div>
        ) : null}

        {activeTab === "promocoes" ? (
          <div>
            <div className={styles.eyebrow}>Promoções</div>
            <h1 className={styles.pageTitle}>Veja as promoções desse mês</h1>
            <p className={styles.pageSub}>
              Ofertas selecionadas pelo time Santa Maria, organizadas por
              categoria.
            </p>

            <div className={styles.filters}>
              <button
                type="button"
                onClick={() => setFilter("todas")}
                className={`${styles.filter} ${
                  filter === "todas"
                    ? styles.filterActive
                    : styles.filterInactive
                }`}
              >
                Todas
              </button>
              {promotionCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setFilter(category.id)}
                  className={`${styles.filter} ${
                    filter === category.id
                      ? styles.filterActive
                      : styles.filterInactive
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>

            {visibleCategories.map((category) => (
              <div key={category.id} className={styles.categoryBlock}>
                <h2 className={styles.categoryTitle}>{category.title}</h2>
                <p className={styles.categoryDesc}>{category.description}</p>
                <div className={styles.promoGrid}>
                  {promotionsReference
                    .filter((promotion) => promotion.category === category.id)
                    .map((promotion) => (
                      <div key={promotion.id} className={styles.promoCard}>
                        <span className={styles.discountBadge}>
                          {promotion.discountLabel}
                        </span>
                        <div className={styles.promoImage}>{promotion.icon}</div>
                        <h3 className={styles.promoTitle}>{promotion.title}</h3>
                        <div className={styles.promoStore}>{promotion.store}</div>
                        <div className={styles.priceRow}>
                          <span className={styles.priceOld}>
                            {promotion.oldPrice}
                          </span>
                          <span className={styles.priceNew}>
                            {promotion.newPrice}
                          </span>
                        </div>
                        <div className={styles.validity}>
                          {promotion.validity}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {activeTab === "historico" ? (
          <div>
            <div className={styles.eyebrow}>Acompanhamento</div>
            <h1 className={styles.pageTitle}>
              Histórico de benefícios usados
            </h1>
            <p className={styles.pageSub}>
              Todos os benefícios que você já utilizou.
            </p>
            <section className={styles.card}>
              <div className={styles.historyTableWrap}>
                <table className={styles.historyTable}>
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Benefício</th>
                      <th>Loja</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyEntries.map((entry) => (
                      <tr key={`${entry.date}-${entry.benefit}`}>
                        <td>{entry.date}</td>
                        <td>
                          <span className={styles.tag}>{entry.benefit}</span>
                        </td>
                        <td>{entry.store}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        ) : null}

        {activeTab === "cadastro" ? (
          <div>
            <div className={styles.eyebrow}>Meu cadastro</div>
            <h1 className={styles.pageTitle}>Seus dados</h1>
            <p className={styles.pageSub}>
              Informações do seu cadastro no Círculo Santa Maria.
            </p>
            <section className={styles.card}>
              <div className={styles.profileGrid}>
                {profileFields.map((field) => (
                  <div key={field.label} className={styles.profileField}>
                    <div className={styles.profileLabel}>{field.label}</div>
                    <div className={styles.profileValue}>{field.value}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        ) : null}
      </main>
    </div>
  );
}
