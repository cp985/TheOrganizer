import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import {connectDB} from "@/lib/db" 
import {User, UserModel} from "@/models/User" 

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        try {
          await connectDB()

          // Cerca l'utente nel DB
          const user = await UserModel.findOne({ username: credentials.username }).exec()
          if (!user) {
            return null
          }

          // Verifica la password con bcrypt
          const passwordsMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          )

          if (!passwordsMatch) {
            return null
          }

          // Ritorna i dati dell'utente (inclusi i permessi admin)
          return {
            id: user._id.toString(),
            email: user.username,
            name: user.password ,
            isAdmin: user.isAdmin, 
          }
        } catch (error) {
          console.error("Errore di autorizzazione:", error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // 1. Salva i dati dell'utente dentro il token JWT al momento del login
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
        token.isAdmin = (user as any).isAdmin
      }
      return token
    },
    // 2. Rende accessibili i dati del token dentro la sessione del client/server
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id
        ;(session.user as any).role = token.role
        ;(session.user as any).isAdmin = token.isAdmin
      }
      return session
    },
  },
})