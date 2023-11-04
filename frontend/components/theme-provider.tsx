"use client"

import * as React from "react"
import { ThemeProvider as NextThemeProvider } from "next-themes"
import { ThemeProviderProps as NextThemeProviderProps } from "next-themes/dist/types"

export interface ThemeProviderProps extends NextThemeProviderProps {}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>
}
