'use server'

import { z } from 'zod'
import { redirect } from 'next/navigation'
import { signIn } from '@/auth/auth'
import { User, UserModel } from '@/models/User'
import { connectDB } from '@/lib/db'
import bcrypt from 'bcrypt'

const loginSchema = z.object({
  username: z.string().min(3, "err-username-3"),
  password: z.string().min(4, "err-password-4"),
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

  try {
    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
    })

    if (result?.error) {
      return {
        success: false,
        message: 'Credenziali non valide / Invalid credentials',
      }
    }
  } catch (error) {
    if ((error as Error).message.includes('NEXT_REDIRECT')) {
      throw error
    }

    return {
      success: false,
      message: 'Credenziali non valide / Invalid credentials',
    }
  }

  redirect('/theorganizer')
}


const registerSchema = z.object({
  username: z.string().min(3, "err-username-3"),
  password: z.string().min(4, "err-password-4"),
})



export async function handleRegister(prevState: FormState, formData: FormData): Promise<FormState> {
  const rawData = {
    username: formData.get('username') as string,
    password: formData.get('password') as string,
  }

  const validated = registerSchema.safeParse(rawData)

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
    }
  }

  const { username, password } = validated.data

  try {
    await connectDB()

    const existingUser = await UserModel.findOne({ username })
    if (existingUser) {
      return {
        success: false,
        message: 'Username già esistente / Username already taken',
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const isAdmin = username === 'admin' ? true : false 

    await UserModel.create({
      username,
      password: hashedPassword,
      isAdmin, 
    })

  } catch (error) {
    if ((error as Error).message.includes('NEXT_REDIRECT')) {
      throw error
    }

    console.error("Errore durante la registrazione:", error)
    return {
      success: false,
      message: 'Errore del server durante la registrazione / Server error during registration',
    }
  }
try {
  const result = await signIn('credentials', {
    username,
    password,
    redirect: false,
  })
} catch (error) {
  if ((error as Error).message.includes('NEXT_REDIRECT')) {
    throw error
  }
  return {
      success: false,
      message: 'Credenziali non valide / Invalid credentials',
    }
}

  redirect('/theorganizer')
}