"use client"

import React from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Loader2, CreditCard, QrCode } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { UPIPayment } from "./upi-payment"

interface PaymentInfo {
  orderId: string
  payment_method: string
  cardData?: {
    number: string
    expiry: string
    cvc: string
  }
}

export function PaymentMethods() {
  const [selectedMethod, setSelectedMethod] = React.useState<string>("credit")
  const [loading, setLoading] = React.useState(false)
  const [paymentInfo, setPaymentInfo] = React.useState<PaymentInfo | null>(null)
  const { cart } = useCart()
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const handleSubmit = async (txnId?: string) => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to complete your order",
          variant: "destructive",
        })
        return
      }

      // Get shipping address
      const { data: addresses } = await supabase
        .from("addresses")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_default", true)
        .single()

      if (!addresses) {
        toast({
          title: "Shipping address required",
          description: "Please add a shipping address before proceeding",
          variant: "destructive",
        })
        return
      }

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          total_amount: total,
          status: "pending",
          shipping_address_id: addresses.id,
          payment_method: selectedMethod,
          payment_status: "pending",
          transaction_id: txnId,
        })
        .select()
        .single()

      if (orderError) throw orderError

      // Create order items
      const orderItems = cart.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      }))

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems)

      if (itemsError) throw itemsError

      // Clear cart
      await supabase
        .from("cart")
        .delete()
        .eq("user_id", user.id)

      setPaymentInfo({
        orderId: order.id,
        payment_method: selectedMethod,
      })

      toast({
        title: "Order placed successfully",
        description: "Your order has been placed and is being processed",
      })

      router.push(`/orders/${order.id}`)
    } catch (error: any) {
      console.error("Error placing order:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to place order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          value={selectedMethod}
          onValueChange={setSelectedMethod}
          className="space-y-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="credit" id="credit" />
            <Label htmlFor="credit" className="flex items-center">
              <CreditCard className="mr-2 h-4 w-4" />
              Credit Card
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="upi" id="upi" />
            <Label htmlFor="upi" className="flex items-center">
              <QrCode className="mr-2 h-4 w-4" />
              UPI Payment
            </Label>
          </div>
        </RadioGroup>

        {selectedMethod === "upi" ? (
          <UPIPayment
            amount={total}
            onPaymentSuccess={(txnId) => handleSubmit(txnId)}
          />
        ) : (
          <Button
            className="w-full"
            onClick={() => handleSubmit()}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Pay Now"
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
