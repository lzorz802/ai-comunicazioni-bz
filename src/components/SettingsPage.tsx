import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const SettingsPage = () => (
  <div className="space-y-6">
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-bold text-foreground mb-4">Impostazioni generali</h2>
      <div className="space-y-4 max-w-lg">
        <div>
          <label className="text-sm font-medium text-foreground block mb-1.5">Nome operatore</label>
          <Input defaultValue="Mario Rossi" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1.5">Email notifiche</label>
          <Input defaultValue="mario.rossi@provincia.bz.it" />
        </div>
        <div className="space-y-3 pt-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <Checkbox defaultChecked />
            <span className="text-sm text-foreground">Ricevi notifiche per comunicazioni inviate</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <Checkbox defaultChecked />
            <span className="text-sm text-foreground">Ricevi report statistiche settimanali</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <Checkbox />
            <span className="text-sm text-foreground">Abilita suggerimenti AI avanzati</span>
          </label>
        </div>
        <Button variant="cta" className="mt-4">Salva impostazioni</Button>
      </div>
    </div>
  </div>
);

export default SettingsPage;
