// routes.ts
import {
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  Users2,
  Settings,
  LucideIcon,
} from "lucide-react"
import { FC } from "react"

interface Route {
  href: string
  icon: LucideIcon | FC
  label: string
  isPrimary?: boolean
  isAccent?: boolean
}

const routes: Route[] = [
  { href: "", icon: Package2, label: "Acme Inc", isPrimary: true },
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/orders", icon: ShoppingCart, label: "Orders", isAccent: true },
  { href: "/products", icon: Package, label: "Products" },
  { href: "/customers", icon: Users2, label: "Customers" },
  { href: "/analytics", icon: LineChart, label: "Analytics" },
  { href: "/settings", icon: Settings, label: "Settings" },
]

export default routes
