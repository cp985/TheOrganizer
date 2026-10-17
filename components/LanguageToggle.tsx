// components/LanguageToggle.tsx
'use client'

import { useLanguage } from '@/context/LanguageContext'
import { Languages } from 'lucide-react'
import { useSyncExternalStore } from 'react'

const emptySubscribe = () => () => {}
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

export function LanguageToggle() {
  const { locale, setLocale } = useLanguage()
  const isClient = useIsClient()

  if (!isClient) {
    return (
      <button
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-md border border-border bg-card opacity-50 uppercase tracking-wider"
        type="button"
        disabled
      >
        <Languages className="h-3.5 w-3.5 text-muted-foreground" />
        <span>IT</span>
      </button>
    )
  }

  return (
    <button
      onClick={() => setLocale(locale === 'it' ? 'en' : 'it')}
      className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-md border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-colors uppercase tracking-wider"
      aria-label="Switch Language"
      type="button"
    >
      <Languages className="h-3.5 w-3.5 text-muted-foreground" />
      <span>{locale}</span>
    </button>
  )
}