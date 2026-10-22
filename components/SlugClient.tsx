'use client'

import {type  Product } from '@/models/Product'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import {PencilIcon ,Package, CheckCircle2, AlertTriangle, XCircle, Tag, Calendar, Layers } from 'lucide-react'
import { useParams } from 'next/navigation'
import QuickAction from '@/components/QuickAction'
interface PageProps {
   
MOCK_PRODUCTS: Product[],
isAdmin:boolean
}


export default function ProductDetailPage( { MOCK_PRODUCTS, isAdmin}: PageProps ) {
  
   const { _id } = useParams<{ _id: string }>()
  const { t,locale } = useLanguage()

  const product = MOCK_PRODUCTS.find((p) => p._id === _id)
  if (!product) {
    notFound()
  }

  const getStatusBadge = (status: typeof product.status) => {
    switch (status) {
      case 'in_stock':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" />
            {t.warehouse.inStock}
          </span>
        )
      case 'low_stock':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <AlertTriangle className="w-3 h-3" />
            {t.warehouse.lowStock}
          </span>
        )
      case 'out_of_stock':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <XCircle className="w-3 h-3" />
            {t.warehouse.outOfStock}
          </span>
        )
    }
  }

  const formatDate = (dateStr: string, locale: string) => {
  if (!dateStr) return "";
  const [datePart, timePart] = dateStr.split("T");
  const [year, month, day] = datePart.split("-");
  const time = timePart ? timePart.slice(0, 5) : "";

  // Formato inglese (MM/DD/YYYY) o italiano (DD/MM/YYYY)
  if (locale === "en") {
    return `${month}/${day}/${year} ${time}`;
  }
  
  return `${day}/${month}/${year} ${time}`;
}

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col">


      {/* Contenuto Dettaglio Prodotto */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-6 space-y-6">
        
        {/* Card Principale (Form View Header) */}
      

             <div className="border border-border bg-card rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                onError={(e) => {
                  ;(e.target as HTMLElement).style.display = 'none'
                }}
                className="w-28 h-28 rounded-xl object-cover border border-border bg-muted shrink-0"
              />
            ) : (
              <div className="w-28 h-28 rounded-xl bg-muted flex items-center justify-center shrink-0 border border-border">
                <Package className="w-12 h-12 text-muted-foreground" />
              </div>
            )}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {getStatusBadge(product.status)}
                <span className="text-xs text-muted-foreground font-mono">ID: {product._id}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
  <h2 className="text-2xl font-bold tracking-tight">
    {locale === 'en' ? product.name_en : product.name}
  </h2>

  {/* Pulsante Modifica (Visibile solo agli Admin) */}

    <Link 
      href={`/theorganizer/${product._id}/updateitem`}
      className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-xs font-semibold hover:opacity-90 shadow-sm w-fit transition-opacity"
    >
      <PencilIcon/> <span className={'text-[1rem]'}>{t.updateCreate.updateTitle}</span>
    </Link>
  
</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Layers className="w-4 h-4 text-primary" />
                <span>{ locale === 'en' ? product.category_en : product.category}</span>
              </div>
            </div>
          </div>

          {/* Prezzo e Giacenza */}
          <div className="flex md:flex-col items-end justify-between w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-border">
            <div className="text-left md:text-right">
              <span className="text-xs text-muted-foreground block">{t.warehouse.price}</span>
              <span className="text-3xl font-extrabold text-primary">€ {product.price.toFixed(2)}</span>
            </div>
            <div className="text-right mt-3">
              <span className="text-xs text-muted-foreground block">{t.warehouse.stock}</span>
              <span className="text-lg font-semibold">
                {product.stock} {product.unit}
              </span>
            </div>
          </div>
        </div>

               <div className="border border-border bg-card rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-semibold border-b border-border pb-2">{t.warehouse.technicalDescription}</h3>
            <p className="text-s text-muted-foreground leading-relaxed">
              {locale === 'en' ? product.description_en : product.description}</p>
          </div>

        {/* Griglia Dettagli & Azioni Futura Logica Admin/Movimenti */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Informazioni Articolo */}
          <div className="md:col-span-2 border border-border bg-card rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-semibold border-b border-border pb-2 flex items-center gap-2">
              <Tag className="w-4 h-4 text-primary" />
              <span>{t.warehouse.itemInfo}</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 rounded-lg bg-muted/40 border border-border/50">
                <span className="text-muted-foreground block text-xs">{t.warehouse.sku}</span>
                <span className="font-mono font-medium">{product.sku}</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/40 border border-border/50">
                <span className="text-muted-foreground block text-xs">{t.warehouse.unitOfMeasure}</span>
                <span className="font-medium">{product.unit}</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/40 border border-border/50">
                <span className="text-muted-foreground block text-xs">{t.warehouse.category}</span>
                <span className="font-medium">{ locale === 'en' ? product.category_en : product.category}</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/40 border border-border/50">
                <span className="text-muted-foreground block text-xs flex items-center gap-1">
                  <Calendar className="w-3 h-3"/>
                  {t.warehouse.lastUpdated}
                </span>
                <span className=" font-medium">{formatDate(String(product.lastUpdated), locale)}</span>
              </div>
            </div>
          </div>

          {/* Box Azioni (Prossimi Step) */}
      <QuickAction productId={product._id} productUnit={product.unit} />

        </div>
      </main>
    </div>
  )
}