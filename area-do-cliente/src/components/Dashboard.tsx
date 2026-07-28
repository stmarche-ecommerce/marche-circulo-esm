"use client";

import { useState } from "react";
import type { TabId } from "@/types";
import Sidebar from "@/components/Sidebar";
import OverviewTab from "@/components/tabs/OverviewTab";
import BenefitsTab from "@/components/tabs/BenefitsTab";
import PromotionsTab from "@/components/tabs/PromotionsTab";
import HistoryTab from "@/components/tabs/HistoryTab";
import ProfileTab from "@/components/tabs/ProfileTab";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("geral");

  function handleSelectTab(tab: TabId) {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar activeTab={activeTab} onSelectTab={handleSelectTab} />
      <main className="w-full flex-1 px-6 py-9 md:max-w-[1080px] md:px-12 md:pb-16">
        {activeTab === "geral" && <OverviewTab onNavigate={handleSelectTab} />}
        {activeTab === "beneficios" && <BenefitsTab />}
        {activeTab === "promocoes" && <PromotionsTab />}
        {activeTab === "historico" && <HistoryTab />}
        {activeTab === "cadastro" && <ProfileTab />}
      </main>
    </div>
  );
}
