import { connectDB } from '@/lib/db'
import { StockMovementModel } from '@/models/StockMovement'
import MovementsClient from '@/components/MovementsClient'



export default async function AdminMovementsPage() {
  await connectDB()

  const movementsDocs = await StockMovementModel.find({})
    .sort({ createdAt: -1 })
    .lean()

  const movements = JSON.parse(JSON.stringify(movementsDocs))

  return <MovementsClient initialMovements={movements} />
}