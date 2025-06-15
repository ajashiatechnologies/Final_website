"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Package, Truck, CheckCircle, Clock } from "lucide-react"

const orderStats = [
  {
    title: "Total Orders",
    value: "2,350",
    change: "+12.5%",
    trend: "up",
    icon: Package,
    color: "text-blue-600",
  },
  {
    title: "Pending Orders",
    value: "45",
    change: "-5.2%",
    trend: "down",
    icon: Clock,
    color: "text-orange-600",
  },
  {
    title: "Shipped Orders",
    value: "156",
    change: "+8.1%",
    trend: "up",
    icon: Truck,
    color: "text-purple-600",
  },
  {
    title: "Completed Orders",
    value: "2,149",
    change: "+15.3%",
    trend: "up",
    icon: CheckCircle,
    color: "text-green-600",
  },
]

const statusBreakdown = [
  { status: "Pending", count: 45, percentage: 1.9 },
  { status: "Processing", count: 89, percentage: 3.8 },
  { status: "Shipped", count: 156, percentage: 6.6 },
  { status: "Delivered", count: 2149, percentage: 91.4 },
  { status: "Cancelled", count: 31, percentage: 1.3 },
]

export function OrderStats() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {orderStats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {stat.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Status Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {statusBreakdown.map((item) => (
              <div key={item.status} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Badge variant="outline">{item.status}</Badge>
                  <span className="text-sm text-muted-foreground">{item.count} orders</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
                  </div>
                  <span className="text-sm font-medium">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
