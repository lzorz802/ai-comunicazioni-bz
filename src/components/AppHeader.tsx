import myCivisRosso from "@/assets/my_civis_rosso.png";
import { Menu, X, User, Bell } from "lucide-react";
import { useState } from "react";

const navItems = ["Dashboard Operatore", "Statistiche", "Impostazioni"];

const AppHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto flex items-center justify-between px-4 md:px-6 py-2 text-sm">
          <span className="font-normal tracking-wide">Provincia Autonoma di Bolzano – Alto Adige</span>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline">IT | DE</span>
          </div>
        </div>
      </div>

      <div className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 md:px-6 py-3">
          <div className="flex items-center gap-8">
            <img src={myCivisRosso} alt="myCIVIS" className="h-8 md:h-10 object-contain" />
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className={`text-foreground font-semibold text-sm tracking-wide hover:text-primary transition-colors ${
                    item === "Dashboard Operatore" ? "text-primary border-b-2 border-primary pb-1" : ""
                  }`}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Bell className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-primary" />
            <div className="flex items-center gap-2 text-sm">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-medium text-foreground">Mario Rossi</span>
            </div>
          </div>
          <button className="md:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {menuOpen && (
          <nav className="md:hidden border-t border-border px-4 py-3 flex flex-col gap-3">
            {navItems.map((item) => (
              <a key={item} href="#" className="text-foreground font-semibold text-sm tracking-wide">
                {item}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
