import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import OperatorSidebar from "@/components/OperatorSidebar";
import CommunicationCreator from "@/components/CommunicationCreator";
import RecentCommunications from "@/components/RecentCommunications";
import ActiveCommunications from "@/components/ActiveCommunications";
import SavedTemplates from "@/components/SavedTemplates";
import AudienceSegments from "@/components/AudienceSegments";
import StatisticsPage from "@/components/StatisticsPage";
import SettingsPage from "@/components/SettingsPage";
import AiAssistantPanel from "@/components/AiAssistantPanel";

const sectionTitles: Record<string, { title: string; subtitle: string }> = {
  nuova: { title: "Nuova comunicazione AI", subtitle: "Crea e invia comunicazioni automatizzate con supporto dell'Intelligenza Artificiale" },
  attive: { title: "Comunicazioni attive", subtitle: "Monitora lo stato delle comunicazioni in corso e programmate" },
  template: { title: "Template salvati", subtitle: "Gestisci i template di comunicazione riutilizzabili" },
  segmenti: { title: "Segmenti audience", subtitle: "Visualizza e gestisci i segmenti di destinatari" },
  statistiche: { title: "Statistiche", subtitle: "Analisi delle performance delle comunicazioni inviate" },
  impostazioni: { title: "Impostazioni", subtitle: "Configura le preferenze dell'operatore e del sistema" },
  recenti: { title: "Comunicazioni recenti", subtitle: "Storico delle ultime comunicazioni inviate" },
};

const Index = () => {
  const [activeItem, setActiveItem] = useState("nuova");
  const section = sectionTitles[activeItem] || sectionTitles.nuova;

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <div className="flex flex-1">
        <OperatorSidebar activeItem={activeItem} onItemClick={setActiveItem} />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">{section.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">{section.subtitle}</p>
          </div>
          {activeItem === "nuova" && <CommunicationCreator />}
          {activeItem === "attive" && <ActiveCommunications />}
          {activeItem === "template" && <SavedTemplates />}
          {activeItem === "segmenti" && <AudienceSegments />}
          {activeItem === "statistiche" && <StatisticsPage />}
          {activeItem === "impostazioni" && <SettingsPage />}
          {activeItem === "recenti" && <RecentCommunications />}
        </main>
      </div>
      <AppFooter />
      <AiAssistantPanel />
    </div>
  );
};

export default Index;
