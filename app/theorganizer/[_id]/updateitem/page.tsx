import { connectDB } from '@/lib/db'
import { ProductModel } from '@/models/Product'
import ProductForm from '@/components/ItemForm' 
import { notFound } from 'next/navigation'



interface EditPageProps {
  params: Promise<{ id: string }>
}

export default async function UpdateItemPage({ params }: EditPageProps) {
  const { id } = await params

  await connectDB()
  const productDoc = await ProductModel.findById(id).lean()

  if (!productDoc) {
    notFound()
  }

  const product = JSON.parse(JSON.stringify(productDoc))

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Modifica Prodotto</h1>
      {/* Passando initialData, il form si pre-compila e sa che deve aggiornare */}
      <ProductForm initialData={product} />
    </div>
  )
}