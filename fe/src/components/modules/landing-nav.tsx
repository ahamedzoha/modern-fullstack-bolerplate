"use client"

import { Skeleton } from "../ui/skeleton"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { publicRoutes } from "@/config/routes"
import { cn } from "@/lib/utils"
import { useAuth } from "@clerk/nextjs"
import Link from "next/link"
import * as React from "react"

/**
 * Component for rendering the landing navigation menu.
 */
export function LandingNav() {
  const { isLoaded, isSignedIn, signOut } = useAuth()

  return (
    <div className="flex items-center justify-center w-full">
      <NavigationMenu>
        <NavigationMenuList className="flex-wrap">
          <NavigationMenuItem>
            {/* TODO: ADD LOGO */}
            <div className="h-6 w-12 bg-slate-200" />
          </NavigationMenuItem>
          {publicRoutes.map((route) => (
            <NavigationMenuItem key={route.title}>
              {route.href ? (
                <Link href={route.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {route.title}
                  </NavigationMenuLink>
                </Link>
              ) : (
                <>
                  <NavigationMenuTrigger>{route.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul
                      className={cn(
                        "grid gap-3 p-4",
                        route.className || "md:w-[400px] lg:w-[500px]",
                      )}
                    >
                      {route.children?.map((child, index) =>
                        child.highlight ? (
                          <li key={index} className="row-span-3">
                            <NavigationMenuLink asChild>
                              <a
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                href={child.href}
                              >
                                {/* TODO: Replace this with 6x6 next/image */}
                                <div className="h-6 w-6 bg-slate-200" />
                                <div className="mb-2 mt-4 text-lg font-medium">
                                  {child.title}
                                </div>
                                <p className="text-sm leading-tight text-muted-foreground">
                                  {child.description}
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        ) : (
                          <ListItem
                            key={index}
                            href={child.href}
                            title={child.title}
                            className={child.className}
                          >
                            {child.description}
                          </ListItem>
                        ),
                      )}
                    </ul>
                  </NavigationMenuContent>
                </>
              )}
            </NavigationMenuItem>
          ))}
          {/* Skeleton loaders */}
          {!isLoaded && (
            <div className="flex gap-x-4">
              <Skeleton className="h-6 w-14" />
              <Skeleton className="h-6 w-14" />
            </div>
          )}
          {/* Sign up/sign in */}
          {isLoaded && !isSignedIn && (
            <>
              <NavigationMenuItem className="cursor-pointer">
                <Link href="/sign-in" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Sign in
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="cursor-pointer">
                <Link href="/sign-up" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Sign up
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </>
          )}
          {/* Signed in Dashboard */}
          {isLoaded && isSignedIn && (
            <>
              <NavigationMenuItem className="cursor-pointer">
                <Link href="/dashboard" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Dashboard
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="cursor-pointer">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  onClick={() => signOut()}
                >
                  Sign out
                </NavigationMenuLink>
              </NavigationMenuItem>
            </>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

/**
 * List item component for rendering a navigation menu link.
 */
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
