import { LandingNav } from '@/components/modules/landing-nav'

export default function Home() {
  return (
    <main className="w-full">
      <LandingNav />
      <div
        className="
        flex
        flex-col
        items-center
        justify-center
        w-full
        h-dvh
      "
      >
        <h1 className="text-9xl font-bold">Welcome to the home page</h1>
      </div>
    </main>
  )
}
