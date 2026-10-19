'use client'
import { useActionState } from 'react'
import { updateStockAction } from '@/actions/productActions'
import { PlusCircle, MinusCircle, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

interface QuickActionsProps {
  productId: string
  productUnit: string
}

export default function QuickActions({ productId, productUnit }: QuickActionsProps) {
  const [state, formAction, isPending] = useActionState(updateStockAction, null)

  return (
    <div className="border border-border bg-card rounded-xl p-6 shadow-sm space-y-4">
      <h3 className="text-base font-semibold border-b border-border pb-2">
        Movimenti Magazzino
      </h3>

      <form action={formAction} className="space-y-4">
        {/* Input nascosto per passare l'ID del prodotto */}
        <input type="hidden" name="productId" value={productId} />

        {/* 1. Selezione Operazione (Carico / Scarico) */}
        <div className="grid grid-cols-2 gap-3">
          <label className="cursor-pointer">
            <input type="radio" name="type" value="in" defaultChecked className="peer sr-only" />
            <div className="flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium rounded-lg border border-border bg-background peer-checked:bg-emerald-600 peer-checked:text-white peer-checked:border-emerald-600 hover:bg-muted transition-colors">
              <PlusCircle className="w-4 h-4" />
              Carico (+)
            </div>
          </label>

          <label className="cursor-pointer">
            <input type="radio" name="type" value="out" className="peer sr-only" />
            <div className="flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium rounded-lg border border-border bg-background peer-checked:bg-rose-600 peer-checked:text-white peer-checked:border-rose-600 hover:bg-muted transition-colors">
              <MinusCircle className="w-4 h-4" />
              Scarico (-)
            </div>
          </label>
        </div>

        {/* 2. Quantità e Causale (Input nativi stilizzati) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground block font-medium">Quantità ({productUnit})</label>
            <input 
              type="number" 
              name="quantity"
              min="1" 
              defaultValue="1" 
              required
              className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-muted-foreground block font-medium">Motivazione / Causale</label>
            <select 
              name="reason"
              className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="restock">Rifornimento Fornitore</option>
              <option value="sale">Vendita Ordine</option>
              <option value="return">Reso Cliente</option>
              <option value="damage">Rottura / Danneggiato</option>
              <option value="adjustment">Rettifica Inventario</option>
            </select>
          </div>
        </div>

        {/* 3. Messaggio di Feedback (Successo o Errore) */}
        {state && (
          <div className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
            state.success ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
          }`}>
            {state.success ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{state.message}</span>
          </div>
        )}

        {/* 4. Pulsante di Conferma (Bottone nativo o Shadcn se già installato) */}
        <button 
          type="submit" 
          disabled={isPending}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2 w-full"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Registrazione in corso...
            </>
          ) : (
            'Conferma Movimento'
          )}
        </button>
      </form>
    </div>
  )
}