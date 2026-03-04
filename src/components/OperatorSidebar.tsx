import { PlusCircle, Radio, FileText, Users, BarChart3, Settings, Clock } from "lucide-react";

interface OperatorSidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

const menuItems = [
  { id: "nuova", label: "Nuova comunicazione AI", icon: PlusCircle },
  { id: "attive", label: "Comunicazioni attive", icon: Radio },
  { id: "recenti", label: "Comunicazioni recenti", icon: Clock },
  { id: "template", label: "Template salvati", icon: FileText },
  { id: "segmenti", label: "Segmenti audience", icon: Users },
  { id: "statistiche", label: "Statistiche", icon: BarChart3 },
  { id: "impostazioni", label: "Impostazioni", icon: Settings },
];

const OperatorSidebar = ({ activeItem, onItemClick }: OperatorSidebarProps) => {
  return (
    <aside className="w-64 bg-card border-r border-border shrink-0 overflow-y-auto">
      <div className="p-4 border-b border-border">
        <h2 className="text-sm font-bold text-primary tracking-wider uppercase">Menu Operatore</h2>
      </div>
      <nav className="p-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors text-left ${
              activeItem === item.id
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-foreground hover:bg-muted"
            }`}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default OperatorSidebar;
