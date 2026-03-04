import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const data = [
  { nome: "Promozione servizio iscrizione scolastica", stato: "In corso", destinatari: "8.320", invio: "03/03/2026", canale: "Email" },
  { nome: "Reminder scadenza contributi famiglia", stato: "Programmata", destinatari: "4.560", invio: "12/03/2026", canale: "Push" },
  { nome: "Aggiornamento normativa edilizia", stato: "In corso", destinatari: "2.100", invio: "01/03/2026", canale: "SMS" },
  { nome: "Nuovo portale certificati anagrafici", stato: "Programmata", destinatari: "15.000", invio: "15/03/2026", canale: "Email" },
];

const ActiveCommunications = () => (
  <div className="space-y-6">
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-bold text-foreground mb-4">Comunicazioni attive</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome comunicazione</TableHead>
            <TableHead>Stato</TableHead>
            <TableHead>Destinatari</TableHead>
            <TableHead>Data invio</TableHead>
            <TableHead>Canale</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{row.nome}</TableCell>
              <TableCell>
                <Badge variant={row.stato === "In corso" ? "default" : "secondary"}>
                  {row.stato}
                </Badge>
              </TableCell>
              <TableCell>{row.destinatari}</TableCell>
              <TableCell>{row.invio}</TableCell>
              <TableCell>{row.canale}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);

export default ActiveCommunications;
