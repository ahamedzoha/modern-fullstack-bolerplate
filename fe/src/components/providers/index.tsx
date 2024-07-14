"use client"

import QueryProvider from "./query-provider"
import { ThemeProvider } from "./theme-provider"
import { FC, PropsWithChildren } from "react"

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryProvider>{children}</QueryProvider>
    </ThemeProvider>
  )
}

export default Providers
