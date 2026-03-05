import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Calendar, Send, Edit3, Save, BarChart3, Mail, Smartphone, MessageSquare, Users, Eye, Sparkles, PlusCircle } from "lucide-react";
import CommunicationSummary from "@/components/CommunicationSummary";
import { Badge } from "@/components/ui/badge";

interface Segment {
  label: string;
  count: number;
  selected: boolean;
  aiSuggested: boolean;
}

const allSegments: Segment[] = [
  { label: "Agenzie immobiliari", count: 247, selected: true, aiSuggested: true },
  { label: "Utenti servizi acquisto immobili", count: 1342, selected: true, aiSuggested: true },
  { label: 'Interesse "Costruire, abitare e territorio"', count: 5891, selected: true, aiSuggested: true },
  { label: "Genitori con figli in età scolare", count: 8320, selected: false, aiSuggested: false },
  { label: "Operatori sanitari registrati", count: 2100, selected: false, aiSuggested: false },
  { label: "Residenti Bolzano città", count: 15000, selected: false, aiSuggested: false },
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

const CommunicationCreator = ({ onScrollTop }: { onScrollTop?: () => void }) => {
  const [commType, setCommType] = useState("");
  const [userPrompt, setUserPrompt] = useState(
    "Vorrei impostare una comunicazione per tutte le persone potenzialmente interessate al nuovo servizio disponibile 'Acquisto di beni immobiliari provinciali'"
  );
  const [segments, setSegments] = useState<Segment[]>(allSegments);
  const [onlyBolzano, setOnlyBolzano] = useState(false);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [sendDate, setSendDate] = useState("2026-03-10");
  const [channel, setChannel] = useState("email");
  const [previewSubject, setPreviewSubject] = useState(defaultPreview.subject);
  const [previewBody, setPreviewBody] = useState(defaultPreview.body);
  const [step, setStep] = useState(1);
  const [sent, setSent] = useState(false);
  const [showNewSegment, setShowNewSegment] = useState(false);
  const [newSegmentPrompt, setNewSegmentPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [createdSegment, setCreatedSegment] = useState<{ label: string; count: number } | null>(null);

  const totalRecipients = segments.filter(s => s.selected).reduce((sum, s) => sum + s.count, 0);

  const handleTypeSelect = (val: string) => {
    setCommType(val);
    if (val && userPrompt) setStep(2);
  };

  const handlePromptSubmit = () => {
    if (commType && userPrompt.trim()) setStep(3);
  };

  const handleSend = () => {
    setSent(true);
    onScrollTop?.();
  };

  const handleBack = () => {
    setSent(false);
    setStep(1);
    setCommType("");
    onScrollTop?.();
  };

  const handleOpenNewSegment = () => {
    setShowNewSegment(true);
    setCreatedSegment(null);
    setNewSegmentPrompt(userPrompt || "Vorrei impostare una comunicazione per tutte le persone potenzialmente interessate al nuovo servizio disponibile 'Acquisto di beni immobiliari provinciali'");
  };

  const handleCreateSegment = () => {
    if (!newSegmentPrompt.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      const newCount = 2847;
      const newLabel = "Cittadini interessati all'acquisto di beni immobiliari provinciali";
      const newSeg: Segment = {
        label: newLabel,
        count: newCount,
        selected: false,
        aiSuggested: false,
      };
      setSegments(prev => [newSeg, ...prev]);
      setIsGenerating(false);
      setCreatedSegment({ label: newLabel, count: newCount });

      // Persist to localStorage for AudienceSegments
      const stored = JSON.parse(localStorage.getItem("newAudienceSegments") || "[]");
      stored.unshift({ nome: newLabel, utenti: newCount.toLocaleString("it-IT"), categoria: "Cittadini", aggiornato: new Date().toLocaleDateString("it-IT"), createdAt: Date.now() });
      localStorage.setItem("newAudienceSegments", JSON.stringify(stored));
    }, 1200);
  };

  const handleSelectCreatedSegment = () => {
    setSegments(prev => prev.map((s, i) => i === 0 ? { ...s, selected: true } : s));
    setCreatedSegment(null);
    setShowNewSegment(false);
    setNewSegmentPrompt("");
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
                {seg.aiSuggested && (
                  <Badge variant="outline" className="text-ai border-ai/30 bg-ai/5 gap-1 text-xs">
                    <Sparkles className="h-3 w-3" /> AI
                  </Badge>
                )}
                <span className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-1 rounded">
                  n° {seg.count.toLocaleString("it-IT")}
                </span>
              </label>
            ))}
          </div>

          {/* Create new segment */}
          {!showNewSegment ? (
            <Button variant="outline" className="mt-4 gap-2" onClick={handleOpenNewSegment}>
              <PlusCircle className="h-4 w-4" />
              Crea nuovo segmento con supporto AI
            </Button>
          ) : createdSegment ? (
            <div className="mt-4 p-5 rounded-lg border-2 border-green-500/30 bg-green-50/50 dark:bg-green-950/20 space-y-3">
              <p className="text-sm font-bold text-foreground flex items-center gap-2">
                ✅ Nuovo segmento creato con successo!
              </p>
              <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                📋 "{createdSegment.label}"
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-1">
                <li>• Persone che hanno visualizzato bandi immobiliari provinciali</li>
                <li>• Utenti registrati ai servizi di alert immobiliari</li>
                <li>• Cittadini con interessi registrati in "Casa e Territorio"</li>
                <li>• <span className="font-semibold text-foreground">Dimensione stimata: {createdSegment.count.toLocaleString("it-IT")} utenti</span></li>
              </ul>
              <p className="text-xs text-muted-foreground">
                🔧 <strong>Per modificare il segmento:</strong> vai su <strong>"Segmenti audience"</strong> (lo trovi in cima alla lista)
              </p>
              <Button variant="cta" className="gap-2 mt-1" onClick={handleSelectCreatedSegment}>
                <Sparkles className="h-4 w-4" />
                Seleziona questo segmento per la tua comunicazione
              </Button>
            </div>
          ) : (
            <div className="mt-4 p-4 rounded-md border border-border bg-muted/30 space-y-3">
              <label className="text-sm font-medium text-foreground block">Descrivi il segmento da creare</label>
              <Textarea
                value={newSegmentPrompt}
                onChange={(e) => setNewSegmentPrompt(e.target.value)}
                placeholder="Es: Cittadini interessati all'acquisto di beni immobiliari provinciali..."
                className="min-h-[80px]"
              />
              <div className="flex gap-2">
                <Button variant="cta" onClick={handleCreateSegment} disabled={!newSegmentPrompt.trim() || isGenerating}>
                  <Sparkles className="h-4 w-4" />
                  {isGenerating ? "Generazione..." : "Genera segmento"}
                </Button>
                <Button variant="ghost" onClick={() => { setShowNewSegment(false); setNewSegmentPrompt(""); }}>
                  Annulla
                </Button>
              </div>
            </div>
          )}

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
