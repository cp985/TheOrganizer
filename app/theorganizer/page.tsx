import { Suspense } from 'react'
import { connection } from 'next/server'
import { getAllProducts } from '@/actions/productActions'
import WherehousePageClient from '@/components/WherehousePageClient'
import Loading from '@/components/Loading'
import { type Product } from '@/models/Product'

async function WarehouseDataFetcher() {
  await connection()
  
  let products: Product[] = []

    products = await getAllProducts()
 

  return <WherehousePageClient MOCK_PRODUCTS={products} />
}

export default function TheOrganizerPage() {
  return (
    <Suspense fallback={<Loading />}>
      <WarehouseDataFetcher />
    </Suspense>
  )
}