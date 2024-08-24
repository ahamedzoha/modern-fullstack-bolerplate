"use client"

import { useSession, signIn, signOut } from "next-auth/react"

type Props = {
  onSignIn: () => Promise<void>
}

export const SignIn = ({ onSignIn }: Props) => {
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
