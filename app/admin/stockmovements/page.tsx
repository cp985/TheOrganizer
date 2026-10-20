import MovementsClient from '@/components/MovementsClient'
import {getAllMovements} from '@/actions/productActions'
import { StockMovement } from '@/models/StockMovement'
import { connection } from 'next/server'

export default async function AdminMovementsPage() {
  await connection()
  
  let movements: StockMovement[] = []

   
  movements = await getAllMovements()



  return <MovementsClient initialMovements={movements} />
}