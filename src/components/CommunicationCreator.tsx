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

interface SegmentRow {
  nome: string;
  utenti: string;
  categoria: string;
  aggiornato: string;
  isNew?: boolean;
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
- Operatori immobiliari registrati
- Utenti che hanno già utilizzato servizi simili
- Persone con interesse per edilizia/territorio

Cordiali saluti,
Provincia Autonoma di Bolzano`,
};

const CommunicationCreator = ({
  onScrollTop,
  onSegmentCreated,
}: {
  onScrollTop?: () => void;
  onSegmentCreated?: (seg: SegmentRow) => void;
}) => {
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
    setNewSegmentPrompt("Cittadini con ISEE sotto €15.000 che non hanno ancora richiesto il contributo affitto 2025");
  };

  const handleCreateSegment = () => {
    if (!newSegmentPrompt.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      const newCount = 1243;
      const newLabel = "Richiedenti potenziali contributo affitto 2025 (fascia ISEE bassa)";
      const newSeg: Segment = {
        label: newLabel,
        count: newCount,
        selected: false,
        aiSuggested: false,
      };
      setSegments(prev => [newSeg, ...prev]);
      setIsGenerating(false);
      setCreatedSegment({ label: newLabel, count: newCount });
    }, 1200);
  };

  const handleSelectCreatedSegment = () => {
    setSegments(prev => prev.map((s, i) => i === 0 ? { ...s, selected: true } : s));

    if (createdSegment) {
      const today = new Date().toLocaleDateString("it-IT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      onSegmentCreated?.({
        nome: createdSegment.label,
        utenti: createdSegment.count.toLocaleString("it-IT"),
        categoria: "AI Generato",
        aggiornato: today,
        isNew: true,
      });
    }

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
                <li>• Cittadini con ISEE certificato sotto la soglia €15.000</li>
                <li>• Utenti che non risultano beneficiari del contributo affitto 2024</li>
                <li>• Residenti in immobili in locazione con contratto registrato</li>
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
                placeholder="Es: Cittadini con ISEE sotto €15.000 che non hanno ancora richiesto il contributo affitto 2025..."
                cla
