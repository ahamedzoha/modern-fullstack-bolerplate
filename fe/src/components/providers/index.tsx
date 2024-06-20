"use client"

import QueryProvider from "./query-provider"
import { ThemeProvider } from "./theme-provider"
import { ClerkProvider } from "@clerk/nextjs"
import { FC, PropsWithChildren } from "react"

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ClerkProvider
        appearance={{
          signUp: {
            elements: {},
          },
        }}
      >
        <QueryProvider>{children}</QueryProvider>
      </ClerkProvider>
    </ThemeProvider>
  )
}

export default Providers
