'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Package } from 'lucide-react'


export default function SplashScreen() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login')
    }, 4000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground select-none">
      {/* Icona e Titolo Animato */}
      <div className="flex flex-col items-center space-y-4">
        <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary animate-bounce">
          <Package className="w-12 h-12" />
        </div>

        <div className="text-center space-y-1">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent animate-pulse">
            theOrganizer
          </h1>
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            Warehouse Management System
          </p>
        </div>
      </div>
{/* Barra di Progresso: Binario bianco, barra che si riempie di nero */}
<div className="w-64 mt-10 space-y-2">
  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden border border-border shadow-inner">
    <div 
      className="h-full bg-black dark:bg-white rounded-full"
      style={{
        width: '0%',
        animation: 'progressFill 4s linear forwards'
      }}
    />
  </div>

  <div className="flex items-center justify-between text-xs text-muted-foreground font-mono px-1">
    <span>Loading resources...</span>
    <span>Initializing</span>
  </div>
</div>
    </div>
  )
}