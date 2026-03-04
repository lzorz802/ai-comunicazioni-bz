import { BarChart3, TrendingUp, Mail, Users } from "lucide-react";

const stats = [
  { label: "Comunicazioni inviate", value: "1.247", icon: Mail, change: "+12%" },
  { label: "Tasso apertura medio", value: "26,3%", icon: TrendingUp, change: "+2,1%" },
  { label: "Destinatari raggiunti", value: "89.540", icon: Users, change: "+8%" },
  { label: "Template utilizzati", value: "34", icon: BarChart3, change: "+5" },
];

const recentStats = [
  { comunicazione: "Scelta medico", inviati: "12.450", aperti: "2.863", tasso: "23%", click: "1.120" },
  { comunicazione: "Permessi edilizi", inviati: "3.214", aperti: "997", tasso: "31%", click: "452" },
  { comunicazione: "Contributi famiglia", inviati: "8.930", aperti: "2.411", tasso: "27%", click: "980" },
  { comunicazione: "Iscrizione scolastica", inviati: "15.120", aperti: "2.873", tasso: "19%", click: "1.540" },
];

const StatisticsPage = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <div key={i} className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <s.icon className="h-5 w-5 text-muted-foreground" />
            <span className="text-xs font-semibold text-cta">{s.change}</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{s.value}</p>
          <p className="text-sm text-muted-foreground">{s.label}</p>
        </div>
      ))}
    </div>
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-bold text-foreground mb-4">Dettaglio per comunicazione</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-2 font-semibold text-muted-foreground">Comunicazione</th>
            <th className="text-left py-2 font-semibold text-muted-foreground">Inviati</th>
            <th className="text-left py-2 font-semibold text-muted-foreground">Aperti</th>
            <th className="text-left py-2 font-semibold text-muted-foreground">Tasso</th>
            <th className="text-left py-2 font-semibold text-muted-foreground">Click</th>
          </tr>
        </thead>
        <tbody>
          {recentStats.map((r, i) => (
            <tr key={i} className="border-b border-border last:border-0">
              <td className="py-2.5 font-medium">{r.comunicazione}</td>
              <td className="py-2.5">{r.inviati}</td>
              <td className="py-2.5">{r.aperti}</td>
              <td className="py-2.5">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-cta/10 text-cta-dark">{r.tasso}</span>
              </td>
              <td className="py-2.5">{r.click}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default StatisticsPage;
