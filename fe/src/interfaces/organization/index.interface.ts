import { Project } from "../project/index.interface"
import { User } from "../user/index.interface"

export interface OrgData {
  id: string
  name: string
  description: string
  users: User[]
  projects: Project[]
}
