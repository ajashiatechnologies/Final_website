"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Download, ArrowRight } from "lucide-react"
import Link from "next/link"
import { getUnsplashImageUrl } from "@/lib/unsplash"

interface OrderConfirmationProps {
  orderId: string
}

export function OrderConfirmation({ orderId }: OrderConfirmationProps) {
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    // Mock order data
    const mockOrder = {
      id: orderId,
      total: 89.97,
      estimatedDelivery: "January 20, 2024",
      items: [
        {
          name: "Arduino Uno R3",
          quantity: 1,
          image: getUnsplashImageUrl("arduino microcontroller", 60, 60),
        },
        {
          name: "Sensor Kit Pro",
          quantity: 1,
          image: getUnsplashImageUrl("electronic sensors", 60, 60),
        },
      ],
    }
    setOrder(mockOrder)
  }, [orderId])

  if (!order) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Order Number:</span>
                <span className="font-semibold">{order.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Total Amount:</span>
                <span className="font-semibold">${order.total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Estimated Delivery:</span>
                <span className="font-semibold">{order.estimatedDelivery}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold mb-4">Items Ordered:</h4>
              <div className="space-y-3">
                {order.items.map((item: any, index: number) => (
                  <div key={index} className="flex items-center gap-3">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1 text-left">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href={`/orders/${orderId}`}>
                View Order Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Receipt
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              A confirmation email has been sent to your email address.
            </p>
            <Button variant="link" asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
