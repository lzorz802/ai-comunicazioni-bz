import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Calendar, Send, Edit3, Save, BarChart3, Mail, Smartphone, MessageSquare, Users, Eye } from "lucide-react";
import CommunicationSummary from "@/components/CommunicationSummary";

const defaultSegments = [
  { label: "Agenzie immobiliari e operatori settore immobiliare", count: 247, selected: true },
  { label: "Utenti servizi acquisto immobili", count: 1342, selected: true },
  { label: 'Interesse "Costruire, abitare e territorio"', count: 5891, selected: true },
];

const defaultPreview = {
  subject: "Nuovo servizio disponibile - Acquisto beni immobiliari provinciali",
  body: `Gentile utente,

la Provincia mette a disposizione il nuovo servizio online per l'acquisto di beni immobiliari provinciali.

👉 Chi può essere interessato:
• Operatori immobiliari registrati
• Utenti che hanno già utilizzato servizi simili
• Persone con interesse per edilizia/territorio

Cordiali saluti,
Provincia Autonoma di Bolzano`,
};

const CommunicationCreator = () => {
  const [commType, setCommType] = useState("");
  const [userPrompt, setUserPrompt] = useState(
    "Vorrei impostare una comunicazione per tutte le persone potenzialmente interessate al nuovo servizio disponibile 'Acquisto di beni immobiliari provinciali'"
  );
  const [segments, setSegments] = useState(defaultSegments);
  const [onlyBolzano, setOnlyBolzano] = useState(false);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [sendDate, setSendDate] = useState("2026-03-10");
  const [channel, setChannel] = useState("email");
  const [previewSubject, setPreviewSubject] = useState(defaultPreview.subject);
  const [previewBody, setPreviewBody] = useState(defaultPreview.body);
  const [step, setStep] = useState(1);
  const [sent, setSent] = useState(false);

  const totalRecipients = segments.filter(s => s.selected).reduce((sum, s) => sum + s.count, 0);

  const channelLabel = channel === "email" ? "Email" : channel === "push" ? "Push" : "SMS";

  const handleTypeSelect = (val: string) => {
    setCommType(val);
    if (val && userPrompt) setStep(2);
  };

  const handlePromptSubmit = () => {
    if (commType && userPrompt.trim()) setStep(3);
  };

  const handleSend = () => {
    setSent(true);
  };

  const handleBack = () => {
    setSent(false);
    setStep(1);
    setCommType("");
  };

  if (sent) {
    return (
      <CommunicationSummary
        data={{
          subject: previewSubject,
          body: previewBody,
          channel,
          sendDate,
          totalRecipients,
          segments: segments.filter(s => s.selected),
          commType,
        }}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Step 1 */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">1. Tipo di comunicazione</h2>
        <Select value={commType} onValueChange={handleTypeSelect}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleziona il tipo di comunicazione..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nuovi-servizi">Comunicazione su nuovi servizi</SelectItem>
            <SelectItem value="servizi-interesse">Comunicazione su servizi di interesse</SelectItem>
            <SelectItem value="stato-pratiche">Comunicazione su stato pratiche</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Step 2 */}
      {commType && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">2. Descrivi la comunicazione</h2>
          <Textarea
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="Descrivi il servizio o la comunicazione che vuoi inviare..."
            className="min-h-[100px] mb-3"
          />
          <Button variant="cta" onClick={handlePromptSubmit} disabled={!userPrompt.trim()}>
            <Send className="h-4 w-4" />
            Genera con AI
          </Button>
        </div>
      )}

      {/* Step 3: Segments */}
      {step >= 3 && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">3. Segmenti target selezionati</h2>
          <div className="space-y-3">
            {segments.map((seg, idx) => (
              <label key={idx} className="flex items-center gap-3 p-3 rounded-md border border-border hover:bg-muted/50 cursor-pointer transition-colors">
                <Checkbox
                  checked={seg.selected}
                  onCheckedChange={(checked) => {
                    const updated = [...segments];
                    updated[idx] = { ...updated[idx], selected: !!checked };
                    setSegments(updated);
                  }}
                />
                <span className="flex-1 text-sm font-medium text-foreground">{seg.label}</span>
                <span className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-1 rounded">
                  n° {seg.count.toLocaleString("it-IT")}
                </span>
              </label>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-md bg-info-bg border border-info/20 flex items-center gap-2">
            <Users className="h-5 w-5 text-info" />
            <span className="text-sm font-semibold text-foreground">
              Totale destinatari: {totalRecipients.toLocaleString("it-IT")} utenti
            </span>
          </div>
        </div>
      )}

      {/* Step 4: Personalizzazione */}
      {step >= 3 && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">4. Personalizzazione</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <Checkbox checked={onlyBolzano} onCheckedChange={(c) => setOnlyBolzano(!!c)} />
              <span className="text-sm text-foreground">Includi solo utenti Provincia Bolzano</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <Checkbox checked={excludeSimilar} onCheckedChange={(c) => setExcludeSimilar(!!c)} />
              <span className="text-sm text-foreground">Escludi chi ha già ricevuto comunicazione simile</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Data invio</label>
                <Input type="date" value={sendDate} onChange={(e) => setSendDate(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Canale</label>
                <Select value={channel} onValueChange={setChannel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">
                      <span className="flex items-center gap-2"><Mail className="h-4 w-4" /> Email</span>
                    </SelectItem>
                    <SelectItem value="push">
                      <span className="flex items-center gap-2"><Smartphone className="h-4 w-4" /> Push</span>
                    </SelectItem>
                    <SelectItem value="sms">
                      <span className="flex items-center gap-2"><MessageSquare className="h-4 w-4" /> SMS</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Preview */}
      {step >= 3 && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Eye className="h-5 w-5" />
            5. Anteprima comunicazione
          </h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Oggetto</label>
              <Input value={previewSubject} onChange={(e) => setPreviewSubject(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Corpo del messaggio</label>
              <Textarea
                value={previewBody}
                onChange={(e) => setPreviewBody(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
              />
            </div>
            <p className="text-xs text-muted-foreground italic">Testo generato automaticamente dall'AI e modificabile</p>
            <div className="flex items-center gap-2 mt-2">
              <Button variant="cta" className="gap-2" size="lg" onClick={handleSend}>
                <Send className="h-4 w-4" /> INVIA COMUNICAZIONE
              </Button>
              <Button variant="cta-outline" className="gap-2">
                <Edit3 className="h-4 w-4" /> MODIFICA SEGMENTI
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2">
                <Save className="h-4 w-4" /> SALVA COME TEMPLATE
              </Button>
              <Button variant="outline" className="gap-2">
                <BarChart3 className="h-4 w-4" /> ANTEPRIMA STATISTICHE
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunicationCreator;
