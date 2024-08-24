"use client"

import { useSession, signIn, signOut } from "next-auth/react"

export const SignIn = () => {
  const { data: session } = useSession()
  console.log(session)

  return (
    <button
      onClick={() => {
        signIn()
      }}
    >
      Sign In
    </button>
  )
}
