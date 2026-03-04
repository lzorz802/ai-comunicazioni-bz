import { useState } from "react";
import { Sparkles, X, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AiAssistantPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "ai" | "user"; content: string }>>([
    { role: "ai", content: "Fammi una domanda" },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: "user" as const, content: message },
      { role: "ai" as const, content: "Grazie per la tua domanda! Sto elaborando una risposta..." },
    ]);
    setMessage("");
  };

  if (!isOpen) {
    return (
      <div
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-card border border-border rounded-lg p-4 flex items-center gap-3 cursor-pointer shadow-lg hover:shadow-xl transition-shadow max-w-sm"
        style={{ borderLeft: "4px solid hsl(var(--ai-purple))" }}
      >
        <div className="h-10 w-10 rounded-full bg-ai-bg flex items-center justify-center shrink-0">
          <Sparkles className="h-5 w-5 text-ai" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground text-sm">Hai dei dubbi?</h3>
          <p className="text-sm text-muted-foreground">
            Apri una chat con l'assistente virtuale →
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 h-[28rem] bg-card border border-border rounded-lg shadow-xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-ai" />
          <span className="font-bold text-foreground text-sm">Assistente virtuale</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`rounded-lg px-3 py-2 text-sm max-w-[80%] ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-border p-3 flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Scrivi un messaggio..."
          className="flex-1 text-sm"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button
          size="icon"
          variant="destructive"
          onClick={handleSend}
          className="shrink-0 bg-primary hover:bg-primary/90"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AiAssistantPanel;
