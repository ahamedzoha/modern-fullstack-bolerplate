"use client"

import SidebarNavItem from "./sidebar-nav-item"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { protectedRoutes } from "@/config/routes"
import { PanelLeft } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

const MobileMenu = () => {
  const pathname = usePathname()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          {protectedRoutes.map((route) => (
            <SidebarNavItem
              key={route.href}
              href={route.href}
              icon={route.icon}
              label={route.label}
              isPrimary={route.isPrimary}
              showLabel
              isActive={pathname === route.href}
            />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default MobileMenu
