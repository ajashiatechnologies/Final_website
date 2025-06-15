"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Truck, Package, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface OrderTrackingProps {
  orderId: string
}

const trackingSteps = [
  {
    title: "Order Placed",
    description: "Your order has been received",
    date: "Jan 15, 2024 - 10:30 AM",
    status: "completed",
    icon: Package,
  },
  {
    title: "Processing",
    description: "Your order is being prepared",
    date: "Jan 15, 2024 - 2:15 PM",
    status: "completed",
    icon: Package,
  },
  {
    title: "Shipped",
    description: "Your order is on its way",
    date: "Jan 16, 2024 - 9:00 AM",
    status: "completed",
    icon: Truck,
  },
  {
    title: "Out for Delivery",
    description: "Your order is out for delivery",
    date: "Jan 18, 2024 - 8:30 AM",
    status: "current",
    icon: Truck,
  },
  {
    title: "Delivered",
    description: "Your order has been delivered",
    date: "Expected: Jan 18, 2024",
    status: "pending",
    icon: Home,
  },
]

export function OrderTracking({ orderId }: OrderTrackingProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Tracking</CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="outline">Tracking #: TRK123456789</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {trackingSteps.map((step, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full border-2",
                    step.status === "completed"
                      ? "bg-green-100 border-green-500 text-green-600"
                      : step.status === "current"
                        ? "bg-blue-100 border-blue-500 text-blue-600"
                        : "bg-gray-100 border-gray-300 text-gray-400",
                  )}
                >
                  {step.status === "completed" ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : step.status === "current" ? (
                    <step.icon className="w-5 h-5" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </div>
                {index < trackingSteps.length - 1 && (
                  <div
                    className={cn("w-0.5 h-12 mt-2", step.status === "completed" ? "bg-green-500" : "bg-gray-300")}
                  />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h4
                  className={cn(
                    "font-semibold",
                    step.status === "completed"
                      ? "text-green-600"
                      : step.status === "current"
                        ? "text-blue-600"
                        : "text-gray-500",
                  )}
                >
                  {step.title}
                </h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{step.date}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">Delivery Information</h4>
          <p className="text-sm text-muted-foreground">
            Your package will be delivered between 9:00 AM - 6:00 PM. No signature required.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
