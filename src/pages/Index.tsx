import { useState, useRef } from "react";
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
  const mainRef = useRef<HTMLElement>(null);
  const section = sectionTitles[activeItem] || sectionTitles.nuova;

  const handleItemClick = (item: string) => {
    setActiveItem(item);
    mainRef.current?.scrollTo({ top: 0 });
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <AppHeader />
      <div className="flex flex-1 min-h-0">
        <OperatorSidebar activeItem={activeItem} onItemClick={handleItemClick} />
        <main ref={mainRef} className="flex-1 overflow-y-auto">
          <div className="p-6 min-h-[calc(100vh-200px)]">
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
          </div>
          <AppFooter />
        </main>
      </div>
      <AiAssistantPanel />
    </div>
  );
};

export default Index;
