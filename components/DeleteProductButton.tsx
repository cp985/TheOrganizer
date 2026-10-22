'use client'

import { useState } from 'react'
import { deleteProduct } from '@/actions/productActions'
import { useLanguage } from '@/context/LanguageContext'

export default function DeleteProductButton({ productId }: { productId: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [confirmText, setConfirmText] = useState('')
  const { t } = useLanguage()

  // Il pulsante si attiva solo se l'utente scrive esattamente "cancella" (o "delete" in inglese, oppure lasciamo "cancella" fisso come chiave di sicurezza universale, facciamo che controlla "cancella" o "delete" in base alla lingua!)
  const keyword = t.updateCreate.deleteKeyword || 'cancella'
  const isEnabled = confirmText.toLowerCase().trim() === keyword.toLowerCase()

  return (
    <div className="mt-8 border-t border-destructive/20 pt-6">
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="bg-destructive/10 text-destructive border border-destructive/30 px-4 py-2 rounded-lg text-sm font-medium hover:bg-destructive/20 transition-colors"
        >
          {t.updateCreate.deleteButton}
        </button>
      ) : (
        <div className="bg-destructive/5 border border-destructive/30 p-4 rounded-xl space-y-4 max-w-md">
          <div>
            <h4 className="font-semibold text-destructive text-sm">{t.updateCreate.deleteConfirmTitle}</h4>
            <p className="text-xs text-muted-foreground mt-1">
              {t.updateCreate.deleteConfirmText1}{' '}
              <strong className="text-foreground">{keyword}</strong>{' '}
              {t.updateCreate.deleteConfirmText2}
            </p>
          </div>

          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder={`${t.updateCreate.deletePlaceholder} '${keyword}'`}
            className="w-full p-2 text-sm rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-destructive"
          />

          <div className="flex items-center gap-3">
            <form action={async () => { await deleteProduct(productId) }}>
              <button
                type="submit"
                disabled={!isEnabled}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  isEnabled
                    ? 'bg-destructive text-destructive-foreground hover:opacity-90 cursor-pointer'
                    : 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                }`}
              >
                {t.updateCreate.deleteConfirmAction}
              </button>
            </form>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false)
                setConfirmText('')
              }}
              className="px-4 py-2 rounded-md text-sm font-medium border border-border hover:bg-muted transition-colors"
            >
              {t.updateCreate.cancel}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}