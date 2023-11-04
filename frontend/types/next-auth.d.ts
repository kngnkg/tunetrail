import "next-auth"
import { LoginUser } from "@/types"

declare module "next-auth" {
  interface Session {
    user?: User & LoginUser
    idToken?: string
    accessToken?: string
    isNewUser?: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    idToken?: string
    accessToken?: string
    refreshToken?: string
    tokenExpires?: number
    isNewUser?: boolean
  }
}
