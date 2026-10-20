'use client'

import { useActionState } from 'react'
import { saveProductAction } from '@/actions/productActions'
import { Loader2, Save } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import Link from 'next/link'
import {  ProductFormValues } from '@/lib/zodItemSchema'

interface ProductFormProps {
  initialData?: any
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const { t } = useLanguage()
  const productId = initialData?._id || null

  // Collega la server action con un wrapper per passare il productId
  const actionWithId = saveProductAction.bind(null, productId)

  const [state, formAction, isPending] = useActionState(actionWithId, {
    success: false,
    errors: {} as Record<string, string[]>,
    values: initialData || {},
    message: '',
  })

  // Funzione di supporto per recuperare il valore corrente (priorità ai dati inseriti in caso di errore, poi initialData)
  const getValue = (field: keyof ProductFormValues) => {
    if (state?.values && state.values[field] !== undefined) {
      return state.values[field]
    }
    return initialData?.[field] ?? ''
  }

  return (
    <form action={formAction} className="space-y-6 bg-card p-6 rounded-xl border border-border shadow-sm">
      {state?.message && (
        <div className="p-3 text-sm bg-rose-500/10 border border-rose-500/20 text-rose-600 rounded-lg">
          {state.message}
        </div>
      )}

      {/* SKU */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">{t.updateCreate.skuLabel}</label>
        <input
          type="text"
          name="sku"
          defaultValue={getValue('sku')}
          placeholder={t.updateCreate.skuPlaceholder}
          className={`w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${
            state?.errors?.sku ? 'border-rose-500' : 'border-border'
          }`}
        />
        {state?.errors?.sku && (
          <p className="text-xs text-rose-500 font-medium">{state.errors.sku[0]}</p>
        )}
      </div>

      {/* NOMI (IT & EN) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">{t.updateCreate.nameLabelIt}</label>
          <input
            type="text"
            name="name"
            defaultValue={getValue('name')}
            placeholder={t.updateCreate.namePlaceholderIt}
            className={`w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${
              state?.errors?.name ? 'border-rose-500' : 'border-border'
            }`}
          />
          {state?.errors?.name && (
            <p className="text-xs text-rose-500 font-medium">{state.errors.name[0]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">{t.updateCreate.nameLabelEn}</label>
          <input
            type="text"
            name="name_en"
            defaultValue={getValue('name_en')}
            placeholder={t.updateCreate.namePlaceholderEn}
            className={`w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${
              state?.errors?.name_en ? 'border-rose-500' : 'border-border'
            }`}
          />
          {state?.errors?.name_en && (
            <p className="text-xs text-rose-500 font-medium">{state.errors.name_en[0]}</p>
          )}
        </div>
      </div>

      {/* CATEGORIE (IT & EN) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">{t.updateCreate.categoryLabelIt}</label>
          <input
            type="text"
            name="category"
            defaultValue={getValue('category')}
            placeholder={t.updateCreate.categoryPlaceholderIt}
            className={`w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${
              state?.errors?.category ? 'border-rose-500' : 'border-border'
            }`}
          />
          {state?.errors?.category && (
            <p className="text-xs text-rose-500 font-medium">{state.errors.category[0]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">{t.updateCreate.categoryLabelEn}</label>
          <input
            type="text"
            name="category_en"
            defaultValue={getValue('category_en')}
            placeholder={t.updateCreate.categoryPlaceholderEn}
            className={`w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${
              state?.errors?.category_en ? 'border-rose-500' : 'border-border'
            }`}
          />
          {state?.errors?.category_en && (
            <p className="text-xs text-rose-500 font-medium">{state.errors.category_en[0]}</p>
          )}
        </div>
      </div>

      {/* Stock, Prezzo e Unità */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">{t.updateCreate.stockLabel}</label>
          <input
            type="number"
            name="stock"
            min="0"
            defaultValue={getValue('stock') ?? 0}
            className={`w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${
              state?.errors?.stock ? 'border-rose-500' : 'border-border'
            }`}
          />
          {state?.errors?.stock && (
            <p className="text-xs text-rose-500 font-medium">{state.errors.stock[0]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">{t.updateCreate.priceLabel}</label>
          <input
            type="number"
            step="0.01"
            min="0"
            name="price"
            defaultValue={getValue('price') ?? 0}
            className={`w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${
              state?.errors?.price ? 'border-rose-500' : 'border-border'
            }`}
          />
          {state?.errors?.price && (
            <p className="text-xs text-rose-500 font-medium">{state.errors.price[0]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">{t.updateCreate.unitLabel}</label>
          <input
            type="text"
            name="unit"
            defaultValue={getValue('unit') || 'pz'}
            placeholder={t.updateCreate.unitPlaceholder}
            className={`w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${
              state?.errors?.unit ? 'border-rose-500' : 'border-border'
            }`}
          />
          {state?.errors?.unit && (
            <p className="text-xs text-rose-500 font-medium">{state.errors.unit[0]}</p>
          )}
        </div>
      </div>

      {/* DESCRIZIONI (IT & EN) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">{t.updateCreate.descLabelIt}</label>
          <textarea
            name="description"
            rows={3}
            defaultValue={getValue('description')}
            placeholder={t.updateCreate.descPlaceholderIt}
            className={`w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none ${
              state?.errors?.description ? 'border-rose-500' : 'border-border'
            }`}
          />
          {state?.errors?.description && (
            <p className="text-xs text-rose-500 font-medium">{state.errors.description[0]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">{t.updateCreate.descLabelEn}</label>
          <textarea
            name="description_en"
            rows={3}
            defaultValue={getValue('description_en')}
            placeholder={t.updateCreate.descPlaceholderEn}
            className={`w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none ${
              state?.errors?.description_en ? 'border-rose-500' : 'border-border'
            }`}
          />
          {state?.errors?.description_en && (
            <p className="text-xs text-rose-500 font-medium">{state.errors.description_en[0]}</p>
          )}
        </div>
      </div>

      {/* Pulsanti di Azione */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
        <Link
          href="/theorganizer"
          className="px-4 py-2 text-sm font-medium rounded-lg border border-border bg-background hover:bg-muted transition-colors"
        >
          {t.updateCreate.cancel}
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 shadow-sm"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {t.updateCreate.saving}
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {initialData ? t.updateCreate.updateTitle : t.updateCreate.createTitle}
            </>
          )}
        </button>
      </div>
    </form>
  )
}