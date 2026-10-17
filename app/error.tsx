'use client'

import { useEffect } from 'react'
import { AlertOctagon, RotateCcw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Errore catturato da Error Boundary:', error)
  }, [error])

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 text-foreground">
      <div className="max-w-md w-full border border-border bg-card rounded-2xl p-6 shadow-lg text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 mx-auto flex items-center justify-center border border-rose-500/20">
          <AlertOctagon className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-bold tracking-tight">Si è verificato un errore! / An error occurred</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Non siamo riusciti a caricare correttamente questa sezione del magazzino. Puoi riprovare o aggiornare la pagina. / We couldn&apos;t load this section of the warehouse correctly. You can try again or refresh the page.
          </p>
        </div>

        <div className="pt-2">
          <button
           onClick={() => window.location.reload()}
            className="inline-flex items-center cursor-pointer justify-center gap-2 px-4 py-2 text-xs font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity shadow-sm w-full"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Riprova il caricamento/Refresh the page again</span>
          </button>
        </div>
      </div>
    </div>
  )
}