import { CheckCircle2, Mail, Smartphone, MessageSquare, Users, Calendar, ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CommunicationSummaryProps {
  data: {
    subject: string;
    body: string;
    channel: string;
    sendDate: string;
    totalRecipients: number;
    segments: { label: string; count: number }[];
    commType: string;
  };
  onBack: () => void;
}

const channelInfo: Record<string, { label: string; icon: React.ReactNode }> = {
  email: { label: "Email", icon: <Mail className="h-5 w-5" /> },
  push: { label: "Notifica Push", icon: <Smartphone className="h-5 w-5" /> },
  sms: { label: "SMS", icon: <MessageSquare className="h-5 w-5" /> },
};

const CommunicationSummary = ({ data, onBack }: CommunicationSummaryProps) => {
  const ch = channelInfo[data.channel] || channelInfo.email;
  const formattedDate = new Date(data.sendDate).toLocaleDateString("it-IT", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Success banner */}
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Comunicazione inviata con successo!</h1>
        <p className="text-muted-foreground">
          La comunicazione è stata programmata e verrà inviata il <strong>{formattedDate}</strong>.
          Riceverai una conferma via email al completamento dell'invio.
        </p>
      </div>

      {/* Riepilogo */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5" /> Riepilogo comunicazione
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-md">
              <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Canale di invio</p>
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                {ch.icon}
                {ch.label}
              </div>
            </div>
            <div className="p-4 bg-muted rounded-md">
              <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Data programmata</p>
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Calendar className="h-5 w-5" />
                {formattedDate}
              </div>
            </div>
            <div className="p-4 bg-muted rounded-md">
              <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Destinatari totali</p>
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Users className="h-5 w-5" />
                {data.totalRecipients.toLocaleString("it-IT")} utenti
              </div>
            </div>
            <div className="p-4 bg-muted rounded-md">
              <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Segmenti target</p>
              <p className="text-sm font-medium text-foreground">{data.segments.length} segmenti selezionati</p>
            </div>
          </div>

          {/* Segments detail */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-2">Segmenti inclusi:</p>
            <ul className="space-y-1">
              {data.segments.map((seg, i) => (
                <li key={i} className="flex items-center justify-between text-sm py-1.5 px-3 bg-muted/50 rounded">
                  <span className="text-foreground">{seg.label}</span>
                  <span className="text-muted-foreground font-medium">{seg.count.toLocaleString("it-IT")} utenti</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Preview messaggio */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Anteprima del messaggio inviato</h2>
        <div className="border border-border rounded-md p-4 bg-muted/30">
          <p className="text-sm font-semibold text-foreground mb-2">Oggetto: {data.subject}</p>
          <hr className="border-border my-3" />
          <pre className="text-sm text-foreground whitespace-pre-wrap font-sans leading-relaxed">{data.body}</pre>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button variant="cta" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Torna alla Dashboard
        </Button>
        <Button variant="outline" className="gap-2">
          <FileText className="h-4 w-4" /> Scarica riepilogo PDF
        </Button>
      </div>
    </div>
  );
};

export default CommunicationSummary;
