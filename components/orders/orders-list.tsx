"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Download, RotateCcw } from "lucide-react"
import Link from "next/link"
import { getUnsplashImageUrl } from "@/lib/unsplash"

interface Order {
  id: string
  date: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  items: Array<{
    name: string
    quantity: number
    price: number
    image: string
  }>
}

const mockOrders: Order[] = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    status: "delivered",
    total: 89.97,
    items: [
      {
        name: "Arduino Uno R3",
        quantity: 1,
        price: 25.99,
        image: getUnsplashImageUrl("arduino microcontroller board", 80, 80),
      },
      {
        name: "Sensor Kit Pro",
        quantity: 1,
        price: 49.99,
        image: getUnsplashImageUrl("electronic sensors kit", 80, 80),
      },
      {
        name: "Breadboard Jumper Wires",
        quantity: 2,
        price: 6.99,
        image: getUnsplashImageUrl("breadboard jumper wires", 80, 80),
      },
    ],
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-10",
    status: "shipped",
    total: 45.99,
    items: [
      {
        name: "Raspberry Pi 4 Model B",
        quantity: 1,
        price: 45.99,
        image: getUnsplashImageUrl("raspberry pi 4 computer", 80, 80),
      },
    ],
  },
  {
    id: "ORD-2024-003",
    date: "2024-01-05",
    status: "processing",
    total: 129.5,
    items: [
      {
        name: "ESP32 Development Board",
        quantity: 2,
        price: 15.99,
        image: getUnsplashImageUrl("esp32 wifi module", 80, 80),
      },
      {
        name: "OLED Display 128x64",
        quantity: 3,
        price: 9.99,
        image: getUnsplashImageUrl("oled display screen", 80, 80),
      },
      {
        name: "DHT22 Temperature Sensor",
        quantity: 5,
        price: 12.99,
        image: getUnsplashImageUrl("temperature humidity sensor", 80, 80),
      },
    ],
  },
  {
    id: "ORD-2024-004",
    date: "2023-12-28",
    status: "delivered",
    total: 199.99,
    items: [
      {
        name: "Arduino Mega 2560",
        quantity: 1,
        price: 45.99,
        image: getUnsplashImageUrl("arduino mega microcontroller", 80, 80),
      },
      {
        name: "Servo Motor Kit",
        quantity: 1,
        price: 89.99,
        image: getUnsplashImageUrl("servo motor electronics", 80, 80),
      },
      {
        name: "LCD Display 16x2",
        quantity: 2,
        price: 12.99,
        image: getUnsplashImageUrl("lcd display module", 80, 80),
      },
    ],
  },
]

export function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders(mockOrders)
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "shipped":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "processing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "pending":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-muted rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">Order {order.id}</h3>
                <p className="text-sm text-muted-foreground">Placed on {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-4 mt-4 lg:mt-0">
                <Badge className={getStatusColor(order.status)}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
                <span className="text-lg font-semibold">${order.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Order Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {order.items.slice(0, 3).map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity} × ${item.price}
                    </p>
                  </div>
                </div>
              ))}
              {order.items.length > 3 && (
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                  +{order.items.length - 3} more items
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/orders/${order.id}`}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Link>
              </Button>

              {order.status === "delivered" && (
                <>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download Invoice
                  </Button>
                  <Button variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reorder
                  </Button>
                </>
              )}

              {order.status === "shipped" && (
                <Button variant="outline" size="sm">
                  Track Package
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}

      {orders.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <Eye className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No orders found</h3>
          <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
          <Button asChild>
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
