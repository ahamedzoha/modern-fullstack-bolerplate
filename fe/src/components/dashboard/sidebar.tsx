"use client"

import SidebarNav from "./sidebar-nav"
import SidebarNavItem from "./sidebar-nav-item"
import routes from "@/config/routes"
import { usePathname } from "next/navigation"

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        {routes.slice(0, 1).map((route) => (
          <SidebarNavItem
            key={route.href}
            href={route.href}
            icon={route.icon}
            label={route.label}
            isPrimary={route.isPrimary}
            isActive={pathname === route.href}
          />
        ))}
        <SidebarNav>
          {routes.slice(1, -1).map((route) => (
            <SidebarNavItem
              key={route.href}
              href={route.href}
              icon={route.icon}
              label={route.label}
              isPrimary={route.isPrimary}
              isActive={pathname === route.href}
            />
          ))}
        </SidebarNav>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        {routes.slice(-1).map((route) => (
          <SidebarNavItem
            key={route.href}
            href={route.href}
            icon={route.icon}
            label={route.label}
            isPrimary={route.isPrimary}
            isActive={pathname === route.href}
          />
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
