import Header from "@/components/dashboard/header"
import Sidebar from "@/components/dashboard/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { FC, PropsWithChildren } from "react"

/**
 * Component for rendering the dashboard layout.
 */
const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Sidebar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Header />
          <main>{children}</main>
        </div>
      </div>
    </TooltipProvider>
  )
}

export default DashboardLayout
