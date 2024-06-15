import TooltipWrapper from "./tooltip-wrapper"
import { LucideIcon } from "lucide-react"
import Link from "next/link"
import { FC } from "react"

interface SidebarNavItemProps {
  href: string
  icon: LucideIcon
  label: string
  isPrimary?: boolean
  isAccent?: boolean
}

const SidebarNavItem: FC<SidebarNavItemProps> = ({
  href,
  icon: Icon,
  label,
  isPrimary,
  isAccent,
}) => {
  const classes = isPrimary
    ? "group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
    : isAccent
      ? "flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
      : "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"

  return (
    <TooltipWrapper content={label}>
      <Link href={href} className={classes}>
        <Icon className="h-5 w-5" />
        <span className="sr-only">{label}</span>
      </Link>
    </TooltipWrapper>
  )
}

export default SidebarNavItem
