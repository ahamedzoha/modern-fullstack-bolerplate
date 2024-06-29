import { NEXT_PUBLIC_API_BASE_URL as API_BASE_URL } from "@/lib/safe-env"
import { User } from "@clerk/backend"
import { cookies } from "next/headers"

export interface UserListResponse {
  data: User[]
  totalCount: number
}

export const getUsers = async (): Promise<UserListResponse> => {
  const response = await fetch(`${API_BASE_URL}/users`, {
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
