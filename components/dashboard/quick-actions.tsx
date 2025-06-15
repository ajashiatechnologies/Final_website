"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart, Package, MessageCircle, User, Search } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  const actions = [
    {
      title: "Browse Products",
      description: "Explore our catalog",
      icon: Search,
      href: "/products",
      color: "text-blue-600",
    },
    {
      title: "View Cart",
      description: "Check your items",
      icon: ShoppingCart,
      href: "/cart",
      color: "text-green-600",
    },
    {
      title: "Wishlist",
      description: "Saved items",
      icon: Heart,
      href: "/wishlist",
      color: "text-red-600",
    },
    {
      title: "Track Orders",
      description: "Order status",
      icon: Package,
      href: "/orders",
      color: "text-orange-600",
    },
    {
      title: "Support",
      description: "Get help",
      icon: MessageCircle,
      href: "/help",
      color: "text-purple-600",
    },
    {
      title: "Profile",
      description: "Account settings",
      icon: User,
      href: "/profile",
      color: "text-gray-600",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button key={index} variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
              <Link href={action.href}>
                <action.icon className={`h-6 w-6 ${action.color}`} />
                <div className="text-center">
                  <p className="font-medium text-sm">{action.title}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
