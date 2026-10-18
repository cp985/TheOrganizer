import { Suspense } from 'react'
import { connection } from 'next/server'
import { getAllProducts } from '@/actions/productActions'
import ProductDetailPage from '@/components/SlugClient'
import Loading from '@/components/Loading'
import { type Product } from '@/models/Product'
async function ProductDetailsFetcher() {
  await connection()
  
  let products: Product[] = []

    products = await getAllProducts()

  
 

  return <ProductDetailPage MOCK_PRODUCTS={products} />
}

export default function ProductDetails() {
 
  return (
    <Suspense fallback={<Loading />}>
      < ProductDetailsFetcher />
    </Suspense>
  )
}