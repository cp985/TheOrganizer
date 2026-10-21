import "next-auth"
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      password: string
      usernamwe: string
      isAdmin: boolean
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    password: string
    usernamwe: string
    isAdmin: boolean
  }
}