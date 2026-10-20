'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { LanguageProvider } from '@/context/LanguageContext'
import Navbar from '@/components/Navbar'
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageProvider>
        <Navbar />
        {children}
        </LanguageProvider >
    </NextThemesProvider>
  )
}