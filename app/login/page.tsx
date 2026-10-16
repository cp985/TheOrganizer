'use client'

import { useActionState } from 'react'
import { handleLogin, FormState } from '@/actions/authActions'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Boxes, Lock, User, ArrowRight, Loader2 } from 'lucide-react'

const initialState: FormState = {}

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(handleLogin, initialState)

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-muted/40 font-sans">
      {/* Header Minimalista con Theme Toggle */}
      <header className="flex justify-between items-center p-6 max-w-7xl w-full mx-auto">
        <div className="flex items-center gap-2.5 font-bold text-xl tracking-tight">
          <div className="p-2 bg-primary text-primary-foreground rounded-lg shadow-sm">
            <Boxes className="h-5 w-5" />
          </div>
          <span>The Organizer</span>
        </div>
        <ThemeToggle />
      </header>

      {/* Main Login Card - Stile Odoo / Enterprise */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-lg p-8 space-y-6">
          <div className="space-y-1.5 text-center">
            <h1 className="text-2xl font-bold tracking-tight">Accedi al Magazzino</h1>
            <p className="text-sm text-muted-foreground">
              Inserisci le tue credenziali per accedere a The Organizer
            </p>
          </div>

          {state.message && (
            <div
              className={`p-3 text-sm rounded-md border ${
                state.success
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                  : 'bg-destructive/10 border-destructive/30 text-destructive'
              }`}
            >
              {state.message}
            </div>
          )}

          <form action={formAction} className="space-y-4">
            {/* Campo Username */}
            <div className="space-y-2">
              <label htmlFor="username" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Nome Utente
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="admin"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>
              {state.errors?.username && (
                <p className="text-xs text-destructive">{state.errors.username[0]}</p>
              )}
            </div>

            {/* Campo Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>
              {state.errors?.password && (
                <p className="text-xs text-destructive">{state.errors.password[0]}</p>
              )}
            </div>

            {/* Pulsante Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 px-4 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Accesso in corso...</span>
                </>
              ) : (
                <>
                  <span>Accedi</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </main>

      {/* Footer Minimalista */}
      <footer className="py-4 text-center text-xs text-muted-foreground">
        © 2026 The Organizer — Enterprise Asset & Warehouse Management
      </footer>
    </div>
  )
}