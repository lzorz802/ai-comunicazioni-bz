import { useState } from "react";
import { Bot, Check, ChevronRight, Sparkles } from "lucide-react";

interface AiAssistantPanelProps {
  communicationType: string;
  userPrompt: string;
  segments: Array<{ label: string; count: number; selected: boolean }>;
  onSegmentsChange: (segments: Array<{ label: string; count: number; selected: boolean }>) => void;
}

const AiAssistantPanel = ({ communicationType, userPrompt, segments, onSegmentsChange }: AiAssistantPanelProps) => {
  const [messages] = useState([
    {
      role: "ai" as const,
      content: `Perfetto! Per il servizio indicato ti suggerisco questi segmenti target:`,
    },
  ]);

  if (!communicationType || !userPrompt) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 h-full flex flex-col items-center justify-center text-center">
        <div className="h-12 w-12 rounded-full bg-ai-bg flex items-center justify-center mb-3">
          <Sparkles className="h-6 w-6 text-ai" />
        </div>
        <h3 className="font-semibold text-foreground mb-1">Assistente AI</h3>
        <p className="text-sm text-muted-foreground">Seleziona un tipo di comunicazione e descrivi il servizio per ricevere suggerimenti AI.</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden h-full flex flex-col">
      <div className="bg-primary px-4 py-3 flex items-center gap-2">
        <Bot className="h-5 w-5 text-primary-foreground" />
        <span className="font-semibold text-sm text-primary-foreground">Assistente AI</span>
        <span className="ml-auto text-xs text-primary-foreground/70 animate-pulse-soft">● Attivo</span>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className="ai-banner">
            <Bot className="h-5 w-5 text-ai shrink-0 mt-0.5" />
            <div>
              <p className="text-foreground font-medium">{msg.content}</p>
              <ul className="mt-3 space-y-2">
                {segments.map((seg, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-cta shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{seg.label}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-muted-foreground italic">
                Vuoi includere tutti questi segmenti o modificarli?
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border p-3">
        <div className="flex gap-2">
          <button
            onClick={() => onSegmentsChange(segments.map(s => ({ ...s, selected: true })))}
            className="flex-1 text-xs font-semibold py-2 px-3 rounded-md bg-cta text-cta-foreground hover:bg-cta-dark transition-colors"
          >
            Includi tutti
          </button>
          <button className="flex-1 text-xs font-semibold py-2 px-3 rounded-md border border-border text-foreground hover:bg-muted transition-colors">
            Modifica <ChevronRight className="h-3 w-3 inline" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiAssistantPanel;
