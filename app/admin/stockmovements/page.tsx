import { connectDB } from '@/lib/db'
import { StockMovementModel } from '@/models/StockMovement'
import { ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react'



export default async function AdminMovementsPage() {
  await connectDB()

  // Recupera tutti i movimenti in ordine decrescente (dal più recente)
  const movementsDocs = await StockMovementModel.find({})
    .sort({ createdAt: -1 })
    .lean()

  const movements = JSON.parse(JSON.stringify(movementsDocs))

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Storico Movimenti Magazzino</h1>
          <p className="text-sm text-muted-foreground">Registro completo di tutti i carichi e scarichi effettuati.</p>
        </div>
      </div>

      <div className="border border-border rounded-xl overflow-hidden bg-card shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted text-muted-foreground border-b border-border font-medium">
            <tr>
              <th className="p-3">Data & Ora</th>
              <th className="p-3">SKU</th>
              <th className="p-3">Prodotto</th>
              <th className="p-3">Tipo</th>
              <th className="p-3">Quantità</th>
              <th className="p-3">Causale</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {movements.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-muted-foreground">
                  Nessun movimento registrato finora.
                </td>
              </tr>
            ) : (
              movements.map((m: any) => (
                <tr key={m._id} className="hover:bg-muted/50 transition-colors">
                  <td className="p-3 text-xs text-muted-foreground whitespace-nowrap">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(m.createdAt).toLocaleString('it-IT')}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-xs">{m.productSku}</td>
                  <td className="p-3 font-medium">{m.productName}</td>
                  <td className="p-3">
                    {m.type === 'in' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                        <ArrowDownLeft className="w-3 h-3" />
                        Carico
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-500/10 text-rose-600 border border-rose-500/20">
                        <ArrowUpRight className="w-3 h-3" />
                        Scarico
                      </span>
                    )}
                  </td>
                  <td className="p-3 font-semibold">
                    {m.type === 'in' ? `+${m.quantity}` : `-${m.quantity}`}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-1 rounded-md bg-muted text-xs font-mono text-foreground border border-border">
                      {m.reason}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}