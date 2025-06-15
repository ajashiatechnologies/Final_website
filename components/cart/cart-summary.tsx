"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-provider"
import { useState } from "react"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"

export function CartSummary() {
  const { cart } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [discount, setDiscount] = useState(0)

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  const shipping = subtotal > 2000 ? 0 : 199 // Free shipping over ₹2000
  const tax = subtotal * 0.18 // 18% GST
  const total = subtotal + shipping + tax - discount

  // Format price in Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const applyCoupon = () => {
    // Mock coupon logic
    if (couponCode.toLowerCase() === "welcome10") {
      setDiscount(subtotal * 0.1)
    } else if (couponCode.toLowerCase() === "save200") {
      setDiscount(200)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal ({cart.length} items)</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
          </div>

          <div className="flex justify-between">
            <span>GST (18%)</span>
            <span>{formatPrice(tax)}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-{formatPrice(discount)}</span>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>

        {/* Coupon Code */}
        <div className="space-y-2">
          <Label htmlFor="coupon">Coupon Code</Label>
          <div className="flex gap-2">
            <Input
              id="coupon"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <Button variant="outline" onClick={applyCoupon}>
              Apply
            </Button>
          </div>
        </div>

        <Button className="w-full" size="lg" asChild>
          <Link href="/checkout">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Proceed to Checkout
          </Link>
        </Button>

        <p className="text-xs text-muted-foreground text-center">Secure checkout with SSL encryption</p>
      </CardContent>
    </Card>
  )
}
