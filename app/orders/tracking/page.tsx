"use client"

import { useState } from "react"
import { AuthCheck } from "@/components/auth-check"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Package, Truck, CheckCircle, Clock } from "lucide-react"

export default function OrderTrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [trackingData, setTrackingData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleTrack = async () => {
    if (!trackingNumber) return

    setLoading(true)
    try {
      const response = await fetch(`/api/orders/track?number=${trackingNumber}`)
      const data = await response.json()
      setTrackingData(data)
    } catch (error) {
      console.error("Error tracking order:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "processing":
        return <Package className="h-5 w-5 text-blue-500" />
      case "shipped":
        return <Truck className="h-5 w-5 text-purple-500" />
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AuthCheck>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
          <p className="text-muted-foreground">Enter your order number to track your shipment</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Tracking</CardTitle>
            <CardDescription>Enter your order number or tracking number</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Enter order number (e.g., ORD-123456)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleTrack} disabled={loading || !trackingNumber}>
                {loading ? "Tracking..." : "Track Order"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {trackingData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getStatusIcon(trackingData.status)}
                  Order #{trackingData.order_number}
                </CardTitle>
                <CardDescription>
                  <Badge className={getStatusColor(trackingData.status)}>
                    {trackingData.status.charAt(0).toUpperCase() + trackingData.status.slice(1)}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Order Details</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Order Date:</span>{" "}
                      {new Date(trackingData.created_at).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-medium">Total:</span> ${trackingData.total}
                    </p>
                    <p>
                      <span className="font-medium">Items:</span> {trackingData.order_items?.length || 0}
                    </p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">Shipping Address</h4>
                  <div className="text-sm text-muted-foreground">
                    <p>{trackingData.shipping_address?.address_line_1}</p>
                    <p>
                      {trackingData.shipping_address?.city}, {trackingData.shipping_address?.state}{" "}
                      {trackingData.shipping_address?.postal_code}
                    </p>
                    <p>{trackingData.shipping_address?.country}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tracking Timeline</CardTitle>
                <CardDescription>Follow your order's journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { status: "pending", label: "Order Placed", date: trackingData.created_at },
                    { status: "processing", label: "Order Processing", date: trackingData.processing_date },
                    { status: "shipped", label: "Order Shipped", date: trackingData.shipped_date },
                    { status: "delivered", label: "Order Delivered", date: trackingData.delivered_date },
                  ].map((step, index) => (
                    <div key={step.status} className="flex items-start gap-3">
                      <div className={`mt-1 ${step.date ? "text-primary" : "text-muted-foreground"}`}>
                        {getStatusIcon(step.status)}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${step.date ? "text-foreground" : "text-muted-foreground"}`}>
                          {step.label}
                        </p>
                        {step.date && (
                          <p className="text-sm text-muted-foreground">{new Date(step.date).toLocaleString()}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AuthCheck>
  )
}
