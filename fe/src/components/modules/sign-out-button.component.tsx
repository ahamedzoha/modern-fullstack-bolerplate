"use client"

type Props = {
  onSignOut: () => Promise<void>
}

export const SignOut = ({ onSignOut }: Props) => {
  return (
    <button
      onClick={() => {
        onSignOut()
      }}
    >
      Sign Out
    </button>
  )
}
