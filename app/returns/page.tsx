"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function ReturnRequestPage() {
  const [orderId, setOrderId] = useState("")
  const [reason, setReason] = useState("")
  const [details, setDetails] = useState("")
  const [loading, setLoading] = useState(false)
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to submit a return request.",
          variant: "destructive",
        })
        router.push("/sign-in")
        return
      }

      // Check if order exists and belongs to the user
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .select("id")
        .eq("id", orderId)
        .eq("user_id", user.id)
        .single()

      if (orderError || !order) {
        toast({
          title: "Order Not Found",
          description: "The order ID is invalid or does not belong to your account.",
          variant: "destructive",
        })
        setLoading(false)
        return
      }

      const { error } = await supabase.from("return_requests").insert({
        user_id: user.id,
        order_id: orderId,
        reason: reason,
        details: details,
        status: "pending",
      })

      if (error) {
        throw error
      }

      toast({
        title: "Return Request Submitted",
        description: "Your return request has been submitted successfully. We will review it shortly.",
      })

      setOrderId("")
      setReason("")
      setDetails("")
    } catch (error: any) {
      console.error("Error submitting return request:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to submit return request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Submit a Return Request</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="orderId">Order ID</Label>
              <Input
                id="orderId"
                type="text"
                placeholder="Enter your order ID"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="reason">Reason for Return</Label>
              <Input
                id="reason"
                type="text"
                placeholder="e.g., Damaged item, Wrong product, Changed mind"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="details">Additional Details (Optional)</Label>
              <Textarea
                id="details"
                placeholder="Provide more details about your return, e.g., condition of the item, specific issues."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={5}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
