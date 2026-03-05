import { Users } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const defaultSegments = [
  { nome: "Agenzie immobiliari", utenti: "247", categoria: "Professionisti", aggiornato: "04/03/2026" },
  { nome: "Utenti servizi acquisto immobili", utenti: "1.342", categoria: "Cittadini", aggiornato: "03/03/2026" },
  { nome: 'Interesse "Costruire, abitare e territorio"', utenti: "5.891", categoria: "Interessi", aggiornato: "01/03/2026" },
  { nome: "Genitori con figli in età scolare", utenti: "12.450", categoria: "Cittadini", aggiornato: "28/02/2026" },
  { nome: "Operatori sanitari registrati", utenti: "3.800", categoria: "Professionisti", aggiornato: "25/02/2026" },
  { nome: "Residenti Bolzano città", utenti: "45.200", categoria: "Territorio", aggiornato: "20/02/2026" },
];

interface SegmentRow {
  nome: string;
  utenti: string;
  categoria: string;
  aggiornato: string;
  isNew?: boolean;
}

interface AudienceSegmentsProps {
  extraSegments?: SegmentRow[];
}

const AudienceSegments = ({ extraSegments = [] }: AudienceSegmentsProps) => {
  const segments = [...extraSegments, ...defaultSegments];
  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Segmenti audience</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{segments.length} segmenti totali</span>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome segmento</TableHead>
              <TableHead>Utenti</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Ultimo aggiornamento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {segments.map((s, i) => (
              <TableRow key={i} className={s.isNew ? "bg-green-50/60" : ""}>
                <TableCell className="font-medium">
                  {s.nome}
                  {s.isNew && (
                    <span className="ml-2 text-xs font-semibold text-green-700 bg-green-100 px-1.5 py-0.5 rounded">
                      Nuovo
                    </span>
                  )}
                </TableCell>
                <TableCell>{s.utenti}</TableCell>
                <TableCell><Badge variant="secondary">{s.categoria}</Badge></TableCell>
                <TableCell>{s.aggiornato}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AudienceSegments;
