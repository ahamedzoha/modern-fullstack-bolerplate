import { LandingNav } from "@/components/modules/landing-nav"

export default async function Home() {
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
        <h1 className="text-9xl font-bold">Welcome to the page</h1>
        <div className="mt-4">
          <h2 className="text-4xl font-bold">Users</h2>
        </div>
      </div>
    </main>
  )
}
