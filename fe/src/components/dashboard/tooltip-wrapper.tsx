import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { FC, PropsWithChildren } from "react"

interface TooltipWrapperProps {
  content: string
}

const TooltipWrapper: FC<PropsWithChildren<TooltipWrapperProps>> = ({
  content,
  children,
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="right">{content}</TooltipContent>
    </Tooltip>
  )
}

export default TooltipWrapper
