

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { LanguageProvider } from '@/context/LanguageContext'

import { SessionProvider } from 'next-auth/react'
import NavbarServer from '@/components/NavbarServer'
import {Suspense} from 'react'
import Loading from '@/components/Loading'



export function Providers({ children }: { children: React.ReactNode }) {

  return (
    <SessionProvider>
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageProvider>
    <Suspense fallback={<Loading />}>
          <NavbarServer />
        </Suspense>


        {children}
        </LanguageProvider >
    </NextThemesProvider>
    </SessionProvider>
  )
}