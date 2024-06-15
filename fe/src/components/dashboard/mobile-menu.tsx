import SidebarNavItem from "./sidebar-nav-item"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { PanelLeft } from "lucide-react"
import {
  Home,
  Package,
  Package2,
  ShoppingCart,
  Users2,
  LineChart,
} from "lucide-react"

const MobileMenu = () => {
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
          <SidebarNavItem href="#" icon={Package2} label="Acme Inc" isPrimary />
          <SidebarNavItem href="#" icon={Home} label="Dashboard" />
          <SidebarNavItem
            href="#"
            icon={ShoppingCart}
            label="Orders"
            isAccent
          />
          <SidebarNavItem href="#" icon={Package} label="Products" />
          <SidebarNavItem href="#" icon={Users2} label="Customers" />
          <SidebarNavItem href="#" icon={LineChart} label="Settings" />
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default MobileMenu
