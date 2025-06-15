"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ShoppingCart, Heart, Menu, Search, User, LogIn, Settings, LogOut, Home, Package, Layers, Info, Phone, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { SiteLogo } from "@/components/site-logo"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useEffect, useState } from "react"
import { getCurrentUser, getUserProfile, signOut } from "@/lib/auth"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NavBar } from "@/components/ui/tubelight-navbar"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { itemCount } = useCart()

  const navItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "Products", url: "/products", icon: Package },
    { name: "Categories", url: "/categories", icon: Layers },
    { name: "About", url: "/about", icon: Info },
    { name: "Contact", url: "/contact", icon: Phone },
    { name: "Help", url: "/help", icon: HelpCircle },
  ]

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)

        if (currentUser) {
          const profile = await getUserProfile(currentUser.id)
          setUserProfile(profile)
        }
      } catch (error) {
        console.error("Error checking user:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkUser()
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut()
      setUser(null)
      setUserProfile(null)
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  // Don't show header on sign-in and sign-up pages
  if (pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up")) {
    return null
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center mr-auto">
          <div className="ml-8">
            <SiteLogo />
          </div>
        </div>
        <div className="hidden md:flex flex-1 items-center justify-center">
          <NavBar items={navItems} />
        </div>
        <div className="flex items-center space-x-4 ml-auto">
          <div className="hidden md:flex md:items-center md:space-x-4">
            {user && (
              <Link href="/wishlist">
                <Button variant="ghost" size="icon" className="hover:bg-black/5 dark:hover:bg-white/5">
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Wishlist</span>
                </Button>
              </Link>
            )}
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon" className="hover:bg-black/5 dark:hover:bg-white/5">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white">
                    {itemCount}
                  </div>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
            {!isLoading && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-black/5 dark:hover:bg-white/5">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userProfile?.avatar_url || "/placeholder.svg"} alt={userProfile?.name} />
                      <AvatarFallback>{userProfile?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{userProfile?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">Orders</Link>
                  </DropdownMenuItem>
                  {userProfile?.role === "admin" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin">
                          <Settings className="mr-2 h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/sign-in">
                <Button variant="outline" size="sm">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </Link>
            )}
            <ThemeToggle className="hover:bg-black/5 dark:hover:bg-white/5" />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 py-4">
                <div className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.url}
                      href={item.url}
                      className="flex items-center gap-2 px-2 py-1 text-lg"
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col gap-2 pt-4 border-t">
                  {user && (
                    <Link href="/wishlist" className="flex items-center gap-2 px-2 py-1 text-lg">
                      <Heart className="h-5 w-5" />
                      Wishlist
                    </Link>
                  )}
                  <Link href="/cart" className="flex items-center gap-2 px-2 py-1 text-lg">
                    <ShoppingCart className="h-5 w-5" />
                    Cart {itemCount > 0 && (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white">
                        {itemCount}
                      </div>
                    )}
                  </Link>
                  {!isLoading && user ? (
                    <>
                      <Link href="/dashboard" className="flex items-center gap-2 px-2 py-1 text-lg">
                        <User className="h-5 w-5" />
                        Dashboard
                      </Link>
                      {userProfile?.role === "admin" && (
                        <Link href="/admin" className="flex items-center gap-2 px-2 py-1 text-lg">
                          <Settings className="h-5 w-5" />
                          Admin Dashboard
                        </Link>
                      )}
                      <Button onClick={handleSignOut} variant="ghost" className="justify-start px-2 py-1 text-lg">
                        <LogOut className="mr-2 h-5 w-5" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <Link href="/sign-in" className="flex items-center gap-2 px-2 py-1 text-lg">
                      <User className="h-5 w-5" />
                      Sign In
                    </Link>
                  )}
                  <div className="px-2 py-1">
                    <ThemeToggle />
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
