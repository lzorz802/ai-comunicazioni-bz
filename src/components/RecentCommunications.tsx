import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const recentData = [
  { servizio: "Scelta medico", destinatari: "12.450", inviata: "04/03", tasso: "23%" },
  { servizio: "Permessi edilizi", destinatari: "3.214", inviata: "28/02", tasso: "31%" },
  { servizio: "Contributi famiglia", destinatari: "8.930", inviata: "25/02", tasso: "27%" },
  { servizio: "Iscrizione scolastica", destinatari: "15.120", inviata: "20/02", tasso: "19%" },
];

const RecentCommunications = () => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-bold text-foreground mb-4">Comunicazioni recenti</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Servizio</TableHead>
            <TableHead>Destinatari</TableHead>
            <TableHead>Inviata</TableHead>
            <TableHead>Tasso apertura</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentData.map((row, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{row.servizio}</TableCell>
              <TableCell>{row.destinatari}</TableCell>
              <TableCell>{row.inviata}</TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-cta/10 text-cta-dark">
                  {row.tasso}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentCommunications;
