

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { LanguageProvider } from '@/context/LanguageContext'

import { SessionProvider } from 'next-auth/react'



export function Providers({ children }: { children: React.ReactNode }) {

  return (
    <SessionProvider>
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageProvider>
    
        {children}
        </LanguageProvider >
    </NextThemesProvider>
    </SessionProvider>
  )
}