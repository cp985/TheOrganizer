'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useSyncExternalStore } from 'react'

const emptySubscribe = () => () => {}
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isClient = useIsClient()

  if (!isClient) {
    return <div className="w-9 h-9" />
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-md border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-colors"
      aria-label="Toggle Theme"
      type="button"
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4 text-amber-400" />
      ) : (
        <Moon className="h-4 w-4 text-slate-700" />
      )}
    </button>
  )
}