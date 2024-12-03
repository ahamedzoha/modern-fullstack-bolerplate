import { User } from "../user/index.interface"

export interface Project {
  id: string
  name: string
  description: string
  users: User[]
  status: "active" | "archived" | "deleted"
}
