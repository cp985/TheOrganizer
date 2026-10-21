"use client"

import { Package , ArrowLeft, LogOut} from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";
import { useLanguage } from '@/context/LanguageContext'
import {usePathname} from "next/navigation";
import Link from "next/link";
import {signOut} from "next-auth/react"

interface Props {
  session: any
}

export  default   function NavbarClient( { session }: Props) {




    const pathname = usePathname()

      const { t, locale } = useLanguage()

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-10 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
       { pathname !== '/theorganizer' && pathname !== '/login' ? (<div className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
         <Link href="/theorganizer">
         <ArrowLeft className="w-6 h-6" />
         </Link> 
        </div>) : (<div className="p-2 bg-primary/10 text-primary rounded-lg">
          <Package className="w-6 h-6" />
        </div>)}
    
       
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            {t.warehouse.title}
          </h1>
          <p className="text-xs text-muted-foreground">
            {t.warehouse.subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
       
       {session && (        <button
  onClick={() => signOut({ callbackUrl: '/login' } )}
  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-destructive bg-destructive/10 hover:bg-destructive/20 rounded-md transition-colors"
>
  <LogOut className="w-4 h-4" />
  <span>Logout</span>
</button>) }

        <LanguageToggle />
        <ThemeToggle />
      </div>
    </header>
  );
}
