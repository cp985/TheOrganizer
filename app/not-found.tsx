import Link from 'next/link'
import { FileQuestion, ArrowLeft, Package } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full border border-border bg-card rounded-2xl p-8 shadow-lg text-center space-y-6">
        
        {/* Icona 404 */}
        <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary mx-auto flex items-center justify-center border border-primary/20">
          <FileQuestion className="w-8 h-8" />
        </div>

        {/* Testi */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Pagina non trovata / Page not found</h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            L&apos;articolo o la sezione del magazzino che stai cercando potrebbe essere stato rimosso oppure l&apos;indirizzo inserito non è corretto. / The item or section of the warehouse you are looking for may have been removed or the address entered is incorrect.
          </p>
        </div>

        {/* Bottone di ritorno */}
        <div className="pt-2">
          <Link
            href="/theorganizer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity shadow-sm w-full"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Torna all&apos;inventario/Return to Inventory</span>
          </Link>
        </div>
      </div>
    </div>
  )
}