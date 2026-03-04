import logoProvinciaImg from "@/assets/logo_provincia.png";
import myCivisNero from "@/assets/my_civis_nero.png";

const AppFooter = () => {
  return (
    <footer className="mt-auto">
      <div className="py-3 border-t border-border bg-muted">
        <div className="container mx-auto px-6 flex gap-6 text-sm">
          <a href="#" className="text-primary font-semibold hover:underline">Lasciaci il tuo feedback</a>
          <a href="#" className="text-primary font-semibold hover:underline">Hai bisogno di aiuto?</a>
        </div>
      </div>

      <div className="border-t border-border py-10 bg-muted/60">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-6 mb-8">
            <img src={myCivisNero} alt="myCIVIS" className="h-12 object-contain" />
            <img src={logoProvinciaImg} alt="Provincia Autonoma di Bolzano" className="h-12 object-contain" />
            <span className="text-sm text-muted-foreground ml-4">PNC - Piano Nazionale per la Complementarità</span>
          </div>

          <h3 className="text-sm font-bold text-foreground tracking-wider mb-4">DETTAGLI DI CONTATTO</h3>
          <div className="border-t border-primary pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3 text-sm text-foreground">
                <p>Provincia Autonoma di Bolzano | Informatica Alto Adige SPA</p>
                <p>CF 00390090215</p>
                <a href="mailto:informatik.informatica@pec.prov.bz.it" className="text-foreground underline hover:text-primary block">
                  informatik.informatica@pec.prov.bz.it
                </a>
              </div>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-foreground underline hover:text-primary block">Note legali</a>
                <a href="#" className="text-foreground underline hover:text-primary block">Informativa sulla privacy</a>
                <a href="#" className="text-foreground underline hover:text-primary block">Termini e condizioni</a>
              </div>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-foreground underline hover:text-primary block">Politica sui cookie</a>
                <a href="#" className="text-foreground underline hover:text-primary block">Dichiarazione di accessibilità</a>
                <a href="#" className="text-foreground underline hover:text-primary block">Documento informativo</a>
              </div>
            </div>
            <div className="mt-8 space-y-2 text-sm text-foreground border-t border-border pt-6">
              <p className="font-medium">Responsabile della Protezione dei Dati</p>
              <a href="mailto:rpd@provincia.bz.it" className="underline hover:text-primary block">rpd@provincia.bz.it</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
