"use client"

import * as Primitive from "next-auth/react"

export interface SessionProviderProps extends Primitive.SessionProviderProps {}

export function SessionProvider({ children, ...props }: SessionProviderProps) {
  return (
    <Primitive.SessionProvider {...props}>{children}</Primitive.SessionProvider>
  )
}
