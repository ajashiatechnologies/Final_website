"use client"

import { useSearchParams } from "next/navigation"
import { OrderConfirmation } from "@/components/orders/order-confirmation"
import { AuthCheck } from "@/components/auth-check"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")

  if (!orderId) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Order not found</h1>
        <p className="text-muted-foreground">The order confirmation link is invalid.</p>
      </div>
    )
  }

  return (
    <AuthCheck>
      <OrderConfirmation orderId={orderId} />
    </AuthCheck>
  )
}
