import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { OrgData } from "@/interfaces/organization/index.interface"
import { Project } from "@/interfaces/project/index.interface"
import { User } from "@/interfaces/user/index.interface"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

export const columns: ColumnDef<OrgData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "expand",
    header: ({ table }) => null,
    cell: ({ row }) => (
      <Button
        variant="ghost"
        onClick={() => row.toggleExpanded()}
        className="p-0 h-8 w-8"
      >
        {row.getIsExpanded() ? (
          <ChevronUpIcon className="h-4 w-4" />
        ) : (
          <ChevronDownIcon className="h-4 w-4" />
        )}
      </Button>
    ),
  },
  {
    accessorKey: "name",
    header: "Organization Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate">
        {row.getValue("description")}
      </div>
    ),
  },
  {
    accessorKey: "users",
    header: "Users",
    cell: ({ row }) => {
      const users = row.getValue("users") as User[]
      return <div>{users.length} user(s)</div>
    },
  },
  {
    accessorKey: "projects",
    header: "Projects",
    cell: ({ row }) => {
      const projects = row.getValue("projects") as Project[]
      return <div>{projects.length} project(s)</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const org = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(org.id)}
            >
              Copy organization ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View organization details</DropdownMenuItem>
            <DropdownMenuItem>Manage users</DropdownMenuItem>
            <DropdownMenuItem>Manage projects</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
