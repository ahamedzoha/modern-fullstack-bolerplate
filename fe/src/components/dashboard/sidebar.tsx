import SidebarNav from "./sidebar-nav"
import SidebarNavItem from "./sidebar-nav-item"
import {
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  Users2,
  Settings,
} from "lucide-react"
import Link from "next/link"

const Sidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        <SidebarNavItem href="#" icon={Package2} label="Acme Inc" isPrimary />
        <SidebarNav>
          <SidebarNavItem href="#" icon={Home} label="Dashboard" />
          <SidebarNavItem
            href="#"
            icon={ShoppingCart}
            label="Orders"
            isAccent
          />
          <SidebarNavItem href="#" icon={Package} label="Products" />
          <SidebarNavItem href="#" icon={Users2} label="Customers" />
          <SidebarNavItem href="#" icon={LineChart} label="Analytics" />
        </SidebarNav>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        <SidebarNavItem href="#" icon={Settings} label="Settings" />
      </nav>
    </aside>
  )
}

export default Sidebar
