import ProductForm from '@/components/ItemForm' // Il tuo form condiviso



export default function NewItemPage() {
  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Crea Nuovo Prodotto</h1>
      {/* Senza initialData, il form capisce che è in modalità creazione */}
      <ProductForm />
    </div>
  )
}