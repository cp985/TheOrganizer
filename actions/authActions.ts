'use server'

import { z } from 'zod'

const loginSchema = z.object({
  username: z.string().min(3, "Il nome utente deve contenere almeno 3 caratteri"),
  password: z.string().min(4, "La password deve contenere almeno 4 caratteri"),
})

export type FormState = {
  success?: boolean
  message?: string
  errors?: {
    username?: string[]
    password?: string[]
  }
}

export async function handleLogin(prevState: FormState, formData: FormData): Promise<FormState> {
  const rawData = {
    username: formData.get('username') as string,
    password: formData.get('password') as string,
  }

  const validated = loginSchema.safeParse(rawData)

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
    }
  }

  const { username, password } = validated.data

  // TODO: Collegamento futuro a MongoDB per la verifica reale dell'utente
  if (username === 'admin' && password === 'admin') {
    return {
      success: true,
      message: 'Autenticazione riuscita',
    }
  }

  return {
    success: false,
    message: 'Credenziali non valide. Prova con admin / admin',
  }
}