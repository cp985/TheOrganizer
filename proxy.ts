import { auth } from "@/auth/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const pathname = req.nextUrl.pathname

  // 1. Protezione rotte /theorganizer (richiede solo login)
  if (pathname.startsWith("/theorganizer") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // 2. Protezione rotte /admin (richiede login E privilegi di amministratore)
  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    // Estraiamo i dati dell'utente dal token/sessione
    const user = req.auth?.user as any
    const isAdmin = user?.isAdmin || user?.role === "admin"

    // Se è loggato ma NON è admin, lo reindirizziamo altrove (es. alla dashboard normale)
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/theorganizer", req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    "/theorganizer/:path*",
    "/admin/:path*"
  ]
}