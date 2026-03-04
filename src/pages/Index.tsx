import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import OperatorSidebar from "@/components/OperatorSidebar";
import CommunicationCreator from "@/components/CommunicationCreator";
import RecentCommunications from "@/components/RecentCommunications";

const Index = () => {
  const [activeItem, setActiveItem] = useState("nuova");

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <div className="flex flex-1">
        <OperatorSidebar activeItem={activeItem} onItemClick={setActiveItem} />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Nuova comunicazione AI</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Crea e invia comunicazioni automatizzate con supporto dell'Intelligenza Artificiale
            </p>
          </div>
          <CommunicationCreator />
          <div className="mt-8">
            <RecentCommunications />
          </div>
        </main>
      </div>
      <AppFooter />
    </div>
  );
};

export default Index;
