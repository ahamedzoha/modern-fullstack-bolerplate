import TooltipWrapper from "./tooltip-wrapper"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import Link from "next/link"
import { FC } from "react"

interface SidebarNavItemProps {
  href: string
  icon: LucideIcon | FC
  label: string
  isPrimary?: boolean

  showLabel?: boolean
  isActive?: boolean
}

const SidebarNavItem: FC<SidebarNavItemProps> = ({
  href,
  icon: Icon,
  label,
  isPrimary,

  showLabel,
  isActive,
}) => {
  const iconClasses = cn(
    "flex h-9 w-9 items-center justify-center rounded-full transition-colors md:h-8 md:w-8",
    {
      "bg-primary text-lg font-semibold text-primary-foreground": isPrimary,
      "bg-accent text-accent-foreground hover:text-foreground": isActive,
      "text-muted-foreground hover:text-foreground": !isPrimary && !isActive,
    },
  )

  const linkClasses = cn("flex items-center transition-colors", {
    "gap-2 px-2.5 py-1": showLabel,
    "text-muted-foreground hover:text-foreground": !isPrimary && !isActive,
  })

  return (
    <TooltipWrapper content={label}>
      <Link href={href} className={linkClasses}>
        <div className={iconClasses}>
          <Icon className="h-5 w-5" />
        </div>
        {showLabel && <span className="ml-2 text-md">{label}</span>}
        <span className="sr-only">{label}</span>
      </Link>
    </TooltipWrapper>
  )
}

export default SidebarNavItem
