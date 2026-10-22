'use client'

import { useState, useActionState } from 'react'
import { handleLogin } from '@/actions/authActions'
import { handleRegister } from '@/actions/authActions' 
import { FormState } from '@/actions/authActions'
import { useLanguage } from '@/context/LanguageContext'
import { Lock, User, ArrowRight, Loader2 } from 'lucide-react'

const initialState: FormState = {}

export default function LoginClient() {
  const [isRegisterMode, setIsRegisterMode] = useState(false)
  const { t } = useLanguage()

  // Gestiamo separatamente i due stati delle azioni per evitare conflitti
  const [loginState, loginAction, isLoginPending] = useActionState(handleLogin, initialState)
  const [registerState, registerAction, isRegisterPending] = useActionState(handleRegister, initialState)

  // Selezioniamo quale azione e quale stato usare in base alla modalità scelta dall'utente
  const state = isRegisterMode ? registerState : loginState
  const formAction = isRegisterMode ? registerAction : loginAction
  const isPending = isRegisterMode ? isRegisterPending : isLoginPending



  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-muted/40 font-sans">

      {/* Main Login/Register Card - Stile Odoo / Enterprise */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-lg p-8 space-y-6">
          <div className="space-y-1.5 text-center">
            <h1 className="text-2xl font-bold tracking-tight">
              {isRegisterMode ? "Crea Account" : t.login.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isRegisterMode 
                ? "Registrati per accedere a The Organizer" 
                : t.login.subtitle}
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
                {t.login.usernameLabel}
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
                <p className="text-xs text-destructive">{t.login.errorUser}</p>
              )}
            </div>

            {/* Campo Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t.login.passwordLabel}
              </label>
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
                <p className="text-xs text-destructive">{t.login.errorPassword}</p>
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
                  <span>{t.login.loading}</span>
                </>
              ) : (
                <>
                  <span>{isRegisterMode ? "Registrati" : t.login.submitButton}</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Toggle per switchare tra Login e Registrazione */}
          <div className="text-center pt-2 border-t border-border">
            <button
              type="button"
              onClick={() => setIsRegisterMode(!isRegisterMode)}
              className="text-xs text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
            >
              {isRegisterMode 
                ? "Hai già un account? Accedi" 
                : "Non hai un account? Registrati"}
            </button>
          </div>
        </div>
      </main>

      {/* Footer Minimalista */}
      <footer className="py-4 text-center text-xs text-muted-foreground">
        © 2026 {t.common.appName} — {t.common.appTagline}
      </footer>
    </div>
  )
}