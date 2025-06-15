"use client"

import { useCart } from "@/components/cart-provider"
import { useCheckout } from "./checkout-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "@/lib/utils"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"

interface OrderSummaryProps {
  onBack?: () => void
}

export function OrderSummary({ onBack }: OrderSummaryProps) {
  const { cart } = useCart()
  const { paymentInfo, shippingAddress, resetCheckout } = useCheckout()
  const supabase = createClientComponentClient()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  if (!paymentInfo?.orderId) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No order information available.</p>
        <Button variant="link" onClick={onBack}>
          Go back to payment
        </Button>
      </div>
    )
  }

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 1000 ? 0 : 100 // Free shipping over ₹1000
  const tax = subtotal * 0.18 // 18% GST
  const total = subtotal + shipping + tax

  const handleConfirmOrder = async () => {
    setLoading(true)

    try {
      // Update order status
      const { error } = await supabase
        .from("orders")
        .update({
          status: "confirmed",
          payment_status: "paid",
          total_amount: total,
        })
        .eq("id", paymentInfo.orderId)

      if (error) throw error

      // Show success message
      toast({
        title: "Order confirmed",
        description: "Thank you for your purchase!",
      })

      // Reset checkout state
      resetCheckout()

      // Redirect to order confirmation page
      router.push(`/orders/${paymentInfo.orderId}`)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to confirm order",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Subtotal</p>
                <p className="font-medium">{formatPrice(subtotal)}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Shipping</p>
                <p className="font-medium">
                  {shipping === 0 ? "Free" : formatPrice(shipping)}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Tax (18% GST)</p>
                <p className="font-medium">{formatPrice(tax)}</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <p className="text-base font-medium">Total</p>
              <p className="text-lg font-bold">{formatPrice(total)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shipping Information</CardTitle>
        </CardHeader>
        <CardContent>
          {shippingAddress ? (
            <div className="space-y-2">
              <p className="font-medium">
                {shippingAddress.firstName} {shippingAddress.lastName}
              </p>
              <p>{shippingAddress.address}</p>
              <p>
                {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
              </p>
              <p>{shippingAddress.country}</p>
              <p>{shippingAddress.phone}</p>
            </div>
          ) : (
            <p className="text-muted-foreground">No shipping address provided</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="capitalize">{paymentInfo.method}</p>
          {paymentInfo.method === "card" && paymentInfo.cardData && (
            <p className="text-sm text-muted-foreground">
              Card ending in {paymentInfo.cardData.number.slice(-4)}
            </p>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-4">
        {onBack && (
          <Button variant="outline" onClick={onBack} className="flex-1">
            Back to Payment
          </Button>
        )}
        <Button
          type="button"
          onClick={handleConfirmOrder}
          className="flex-1"
          disabled={loading}
        >
          {loading ? "Confirming..." : "Confirm Order"}
        </Button>
      </div>
    </div>
  )
}
