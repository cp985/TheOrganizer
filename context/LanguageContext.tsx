// context/LanguageContext.tsx
'use client'

import React, { createContext, useContext, useSyncExternalStore } from 'react'
import it from '@/dictionaries/it.json'
import en from '@/dictionaries/en.json'

type Locale = 'it' | 'en'
type Dictionary = typeof it

const dictionaries: Record<Locale, Dictionary> = { it, en }

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Dictionary
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback)
  window.addEventListener('locale-change', callback)
  return () => {
    window.removeEventListener('storage', callback)
    window.removeEventListener('locale-change', callback)
  }
}

function getSnapshot(): Locale {
  if (typeof window === 'undefined') return 'it'
  const saved = localStorage.getItem('app-locale') as Locale
  return saved === 'it' || saved === 'en' ? saved : 'it'
}

function getServerSnapshot(): Locale {
  return 'it'
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Sincronizza direttamente il valore di localStorage con React
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const setLocale = (newLocale: Locale) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('app-locale', newLocale)
      // Notifica React del cambiamento immediato
      window.dispatchEvent(new Event('locale-change'))
    }
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: dictionaries[locale] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage deve essere usato all\'interno di LanguageProvider')
  }
  return context
}