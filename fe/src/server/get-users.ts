import { User, PaginatedResponseJSON } from "@clerk/backend"
import { cookies } from "next/headers"

export interface UserListResponse {
  data: User[]
  totalCount: number
}

export const getUsers = async (): Promise<UserListResponse> => {
  const response = await fetch("http://localhost:3001/users", {
    headers: {
      Cookie: cookies().toString(),
    },
  })
  const data = await response.json()

  try {
    if (!response.ok) {
      throw new Error(data.message)
    }
  } catch (error) {
    console.error(error)
  }
  return data as UserListResponse
}
