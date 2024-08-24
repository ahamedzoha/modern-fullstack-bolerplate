"use client"

import QueryProvider from "./query-provider"
import { ThemeProvider } from "./theme-provider"
import { SessionProvider } from "next-auth/react"
import { FC, PropsWithChildren } from "react"

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <QueryProvider>{children}</QueryProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}

export default Providers
