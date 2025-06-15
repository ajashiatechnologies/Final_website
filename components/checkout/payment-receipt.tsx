"use client"

import { formatPrice } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-provider"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface PaymentReceiptProps {
  transactionId: string
}

interface Payment {
  id: string
  amount: number
  status: string
  payment_method: string
  created_at: string
  upi_id?: string
}

interface User {
  id: string
  email: string
}

export function PaymentReceipt({ transactionId }: PaymentReceiptProps) {
  const [payment, setPayment] = useState<Payment | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { cart } = useCart()
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  useEffect(() => {
    async function loadPaymentDetails() {
      try {
        setIsLoading(true)
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        
        if (userError) throw userError
        if (!user) throw new Error("User not found")
        
        setUser(user)

        const { data: payment, error: paymentError } = await supabase
          .from("payments")
          .select("*")
          .eq("transaction_id", transactionId)
          .single()

        if (paymentError) throw paymentError
        if (!payment) throw new Error("Payment not found")

        setPayment(payment)
      } catch (error: any) {
        console.error("Error loading payment details:", error)
        toast({
          title: "Error",
          description: error.message || "Failed to load payment details",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadPaymentDetails()
  }, [transactionId, supabase, toast])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!payment || !user) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground">Payment details not found</p>
        </CardContent>
      </Card>
    )
  }

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const shipping = subtotal > 1000 ? 0 : 100
  const tax = subtotal * 0.18
  const total = subtotal + shipping + tax

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Payment Receipt</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Transaction ID</p>
          <p className="font-medium">{transactionId}</p>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Date</p>
          <p className="font-medium">
            {new Date(payment.created_at).toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Customer</p>
          <p className="font-medium">{user.email}</p>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Payment Method</p>
          <p className="font-medium capitalize">{payment.payment_method}</p>
          {payment.payment_method === "upi" && payment.upi_id && (
            <p className="text-sm text-muted-foreground">UPI ID: {payment.upi_id}</p>
          )}
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium">Order Items</h3>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  Quantity: {item.quantity}
                </p>
              </div>
              <p className="font-medium">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-sm text-muted-foreground">Subtotal</p>
            <p className="font-medium">{formatPrice(subtotal)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-muted-foreground">Shipping</p>
            <p className="font-medium">
              {shipping === 0 ? "Free" : formatPrice(shipping)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-muted-foreground">Tax (18% GST)</p>
            <p className="font-medium">{formatPrice(tax)}</p>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between">
          <p className="text-base font-medium">Total</p>
          <p className="text-lg font-bold">{formatPrice(total)}</p>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>Thank you for your purchase!</p>
          <p>A copy of this receipt has been sent to your email.</p>
        </div>
      </CardContent>
    </Card>
  )
} 