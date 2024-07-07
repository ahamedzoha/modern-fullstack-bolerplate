export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "member" | "guest"
}
