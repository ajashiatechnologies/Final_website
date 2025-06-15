"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import Link from "next/link"
import { getUnsplashImageUrl } from "@/lib/unsplash"

const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "delivered",
    total: 89.97,
    items: [
      { name: "Arduino Uno R3", image: getUnsplashImageUrl("arduino microcontroller", 60, 60) },
      { name: "Sensor Kit", image: getUnsplashImageUrl("electronic sensors", 60, 60) },
    ],
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    status: "shipped",
    total: 45.99,
    items: [{ name: "Raspberry Pi 4", image: getUnsplashImageUrl("raspberry pi computer", 60, 60) }],
  },
  {
    id: "ORD-003",
    date: "2024-01-05",
    status: "processing",
    total: 129.5,
    items: [
      { name: "ESP32 Board", image: getUnsplashImageUrl("esp32 wifi module", 60, 60) },
      { name: "OLED Display", image: getUnsplashImageUrl("oled display screen", 60, 60) },
    ],
  },
]

export function RecentOrders() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "shipped":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "processing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Orders</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link href="/orders">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {order.items.slice(0, 2).map((item, index) => (
                    <img
                      key={index}
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-10 h-10 rounded-full border-2 border-background object-cover"
                    />
                  ))}
                  {order.items.length > 2 && (
                    <div className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-medium">
                      +{order.items.length - 2}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-semibold">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                <p className="font-semibold">${order.total}</p>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/orders/${order.id}`}>
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
