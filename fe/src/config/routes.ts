import {
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  Users2,
  Settings,
  LucideIcon,
  Building2,
  BlocksIcon,
} from "lucide-react"
import { FC, HTMLProps } from "react"

/**
 * Interface for protected route configuration.
 */
export interface IProtectedRoute {
  href: string
  icon: LucideIcon | FC
  label: string
  isPrimary?: boolean
  isAccent?: boolean
}

/**
 * Interface for public route children configuration.
 */
export interface IPublicRouteChildren {
  title: string
  href: string
  description: string
  imagePath?: string
  className?: HTMLProps<HTMLElement>["className"]
  highlight?: boolean
}

/**
 * Interface for public route configuration.
 */
export interface IPublicRoute {
  title: string
  href?: string
  className?: HTMLProps<HTMLElement>["className"]
  children?: IPublicRouteChildren[]
}

const protectedRoutes: IProtectedRoute[] = [
  { href: "", icon: Building2, label: "Acme Inc", isPrimary: true },
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  {
    href: "/dashboard/organization",
    icon: BlocksIcon,
    label: "Organization",
  },
  { href: "/orders", icon: ShoppingCart, label: "Orders" },
  { href: "/products", icon: Package, label: "Products" },
  { href: "/analytics", icon: LineChart, label: "Analytics" },
  { href: "/settings", icon: Settings, label: "Settings" },
]

const publicRoutes: IPublicRoute[] = [
  {
    title: "Getting Started",
    className: "grid md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]",
    children: [
      {
        title: "shadcn/ui",
        href: "/docs/getting-started/introduction",
        description:
          "Beautifully designed components built with Radix UI and Tailwind CSS.",
        imagePath: "/images/shadcn-ui.png",
        highlight: true,
      },
      {
        title: "Introduction",
        href: "/docs/getting-started/introduction",
        description:
          "Re-usable components built using Radix UI and Tailwind CSS.",
      },
      {
        title: "Installation",
        href: "/docs/getting-started/installation",
        description: "How to install dependencies and structure your app.",
      },
      {
        title: "Typography",
        href: "/docs/getting-started/typography",
        description: "Styles for headings, paragraphs, lists...etc",
      },
    ],
  },
  {
    title: "Components",
    className: "w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]",
    children: [
      {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
          "A modal dialog that interrupts the user with important content and expects a response.",
        highlight: true,
      },
      {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
          "For sighted users to preview content available behind a link.",
      },
      {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
          "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
      },
      {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
      },
      {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
          "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
      },
      {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
          "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
      },
    ],
  },
  {
    title: "Documentation",
    href: "/docs",
    children: [],
  },
]

export { protectedRoutes, publicRoutes }
