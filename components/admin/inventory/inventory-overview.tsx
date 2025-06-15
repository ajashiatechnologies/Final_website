"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react"

const stats = [
  {
    title: "Total Products",
    value: "1,234",
    change: "+12",
    icon: Package,
    trend: "up",
  },
  {
    title: "Low Stock Items",
    value: "23",
    change: "+5",
    icon: AlertTriangle,
    trend: "up",
  },
  {
    title: "Out of Stock",
    value: "8",
    change: "-2",
    icon: TrendingDown,
    trend: "down",
  },
  {
    title: "Total Value",
    value: "$45,231",
    change: "+8.2%",
    icon: TrendingUp,
    trend: "up",
  },
]

export function InventoryOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span> from last
              month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
