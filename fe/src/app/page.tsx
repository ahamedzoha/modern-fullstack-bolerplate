import { LandingNav } from "@/components/modules/landing-nav"
import { getUsers } from "@/server/get-users"

export default async function Home() {
  const users = await getUsers()
  console.log(users?.data?.map((user) => user.firstName))
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
        <div className="mt-4">
          <h2 className="text-4xl font-bold">Users</h2>
          <ul>
            {users?.data?.map((user) => (
              <li key={user.id}>
                {user.firstName} {user.lastName}
              </li>
            ))}
          </ul>

          <p>Total users: {users?.totalCount}</p>
        </div>
      </div>
    </main>
  )
}
