'use client'

import { useState, useTransition } from 'react'
import { deleteMovementAction } from '@/actions/productActions'
import { ArrowUpRight, ArrowDownLeft, Clock, Trash2, Loader2, Package } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
interface MovementsClientProps {
  initialMovements: any[]
}

export default function MovementsClient({ initialMovements}: MovementsClientProps) {
  const [movements, setMovements] = useState(initialMovements)
  const [isPending, startTransition] = useTransition()
  const [deletingId, setDeletingId] = useState<string | null>(null)
const { t } = useLanguage()
  const handleDelete = (id: string) => {
    if (!confirm(t.movementsHistory.deleteConfirm)) return

    setDeletingId(id)
    startTransition(async () => {
      const res = await deleteMovementAction(id)
      if (res.success) {
        setMovements((prev) => prev.filter((m) => m._id !== id))
      } else {
        alert(t.movementsHistory.deleteError)
      }
      setDeletingId(null)
    })
  }

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {t.movementsHistory.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t.movementsHistory.subtitle}
          </p>
        </div>
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground self-start sm:self-auto">
          {movements.length} {t.movementsHistory.countLabel}
        </span>
      </div>

      {/* Lista Flex / No Table */}
      <div className="flex flex-col gap-3">
        {movements.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-card rounded-xl border border-border shadow-sm">
            <Package className="w-10 h-10 text-muted-foreground/50 mb-2" />
            <p className="text-sm text-muted-foreground font-medium">
              {t.movementsHistory.empty}
            </p>
          </div>
        ) : (
          movements.map((m: any) => (
            <div
              key={m._id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-card hover:bg-muted/40 rounded-xl border border-border gap-4 transition-all shadow-sm"
            >
              {/* Dettagli Prodotto e Info */}
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <div
                  className={`p-2.5 rounded-lg flex-shrink-0 mt-0.5 ${
                    m.type === 'in'
                      ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                      : 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
                  }`}
                >
                  {m.type === 'in' ? (
                    <ArrowDownLeft className="w-5 h-5" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5" />
                  )}
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-foreground text-sm truncate">
                      {m.productName}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border">
                      {m.productSku}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{new Date(m.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Tipo, Quantità, Causale e Tasto Elimina */}
              <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-border">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      m.type === 'in'
                        ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
                    }`}
                  >
                    {m.type === 'in'
                      ? t.movementsHistory.typeIn
                      : t.movementsHistory.typeOut}
                  </span>

                  <span className="font-bold text-sm tracking-tight px-2 py-0.5 rounded bg-background border border-border">
                    {m.type === 'in' ? `+${m.quantity}` : `-${m.quantity}`}
                  </span>
                </div>

                {/* Causale */}
                <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-muted text-foreground border border-border max-w-[140px] sm:max-w-[180px] truncate">
                  {m.reason}
                </span>

                {/* Tasto Eliminazione */}
                <button
                  onClick={() => handleDelete(m._id)}
                  disabled={deletingId === m._id}
                  className="p-2 rounded-lg text-muted-foreground hover:text-rose-600 hover:bg-rose-500/10 transition-colors disabled:opacity-50 ml-1"
                  title={t.movementsHistory.deleteTooltip}
                >
                  {deletingId === m._id ? (
                    <Loader2 className="w-4 h-4 animate-spin text-rose-600" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}