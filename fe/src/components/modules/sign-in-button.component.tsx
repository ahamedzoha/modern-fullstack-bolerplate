"use client"

type Props = {
  onSignIn: () => Promise<void>
}

export const SignIn = ({ onSignIn }: Props) => {
  return (
    <button
      onClick={() => {
        onSignIn()
      }}
    >
      Sign In
    </button>
  )
}
