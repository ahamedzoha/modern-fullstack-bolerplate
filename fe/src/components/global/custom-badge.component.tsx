import { Badge } from "../ui/badge"
import { cn } from "@/lib/utils"
import * as React from "react"

type RoleBadgeProps = {
  role: "admin" | "member" | "guest"
} & React.ComponentProps<typeof Badge>

export function RoleBadge({ role, className, ...props }: RoleBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        className,
        role === "admin" &&
          "border-blue-500 bg-blue-100 text-blue-800 dark:border-blue-400 dark:bg-blue-900 dark:text-blue-200",
        role === "member" &&
          "border-green-500 bg-green-100 text-green-800 dark:border-green-400 dark:bg-green-900 dark:text-green-200",
        role === "guest" &&
          "border-yellow-500 bg-yellow-100 text-yellow-800 dark:border-yellow-400 dark:bg-yellow-900 dark:text-yellow-200",
      )}
      {...props}
    >
      {role}
    </Badge>
  )
}

type ProjectStatusBadgeProps = {
  status: "active" | "archived" | "deleted"
} & React.ComponentProps<typeof Badge>

export function ProjectStatusBadge({
  status,
  className,
  ...props
}: ProjectStatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        className,
        status === "active" &&
          "border-green-500 bg-green-100 text-green-800 dark:border-green-400 dark:bg-green-900 dark:text-green-200",
        status === "archived" &&
          "border-yellow-500 bg-yellow-100 text-yellow-800 dark:border-yellow-400 dark:bg-yellow-900 dark:text-yellow-200",
        status === "deleted" &&
          "border-red-500 bg-red-100 text-red-800 dark:border-red-400 dark:bg-red-900 dark:text-red-200",
      )}
      {...props}
    >
      {status}
    </Badge>
  )
}
