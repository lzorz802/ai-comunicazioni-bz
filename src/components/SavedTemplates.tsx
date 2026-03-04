import { FileText, Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const templates = [
  { nome: "Nuovo servizio disponibile", tipo: "Nuovi servizi", creato: "28/02/2026", usato: 3 },
  { nome: "Reminder scadenza pratica", tipo: "Stato pratiche", creato: "15/02/2026", usato: 7 },
  { nome: "Servizio di interesse utente", tipo: "Servizi di interesse", creato: "10/01/2026", usato: 12 },
  { nome: "Comunicazione istituzionale generica", tipo: "Nuovi servizi", creato: "05/01/2026", usato: 5 },
];

const SavedTemplates = () => (
  <div className="space-y-6">
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-bold text-foreground mb-4">Template salvati</h2>
      <div className="grid gap-4">
        {templates.map((t, i) => (
          <div key={i} className="border border-border rounded-lg p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">{t.nome}</p>
                <p className="text-xs text-muted-foreground">{t.tipo} · Creato il {t.creato} · Usato {t.usato} volte</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1"><Copy className="h-3 w-3" /> Usa</Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default SavedTemplates;
