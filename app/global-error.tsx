'use client'

import { RotateCcw, ShieldAlert } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="it">
      <body className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full border border-neutral-800 bg-neutral-900 rounded-2xl p-6 shadow-2xl text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 mx-auto flex items-center justify-center border border-rose-500/20">
            <ShieldAlert className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-bold tracking-tight">Errore Critico di Sistema / Critical System Error</h1>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Si è verificato un problema imprevisto nell&apos;applicazione. Riavvia la sessione per ripristinare il corretto funzionamento. / An unexpected problem occurred in the application. Restart the session to restore proper functionality.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium bg-rose-600 hover:bg-rose-500 text-white rounded-lg transition-colors shadow-sm w-full"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ripristina Applicazione/Reset Application</span>
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}