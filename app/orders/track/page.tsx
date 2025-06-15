"use client"

import React, { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { CircleCheck, Package, Truck, Home, ArrowRight } from "lucide-react"

interface TrackingEvent {
  timestamp: string
  status: string
  location: string
}

interface OrderTrackingInfo {
  orderId: string
  status: string
  estimatedDelivery: string
  events: TrackingEvent[]
}

export default function OrderTrackingPage() {
  const searchParams = useSearchParams()
  const initialOrderId = searchParams.get("orderId") || ""
  const [orderId, setOrderId] = useState(initialOrderId)
  const [trackingInfo, setTrackingInfo] = useState<OrderTrackingInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    if (initialOrderId) {
      fetchTrackingData(initialOrderId)
    }
  }, [initialOrderId])

  const fetchTrackingData = async (id: string) => {
    setLoading(true)
    setError(null)
    setTrackingInfo(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to track your orders.",
          variant: "destructive",
        })
        // For now, we will allow unauthenticated tracking if orderId is provided.
        // In a real app, you might redirect to sign-in or require authentication for tracking personal orders.
        // This API route will handle public vs. authenticated logic.
      }

      const response = await fetch(`/api/orders/${id}/track`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch tracking data")
      }

      setTrackingInfo(data)
    } catch (err: any) {
      setError(err.message)
      toast({
        title: "Tracking Error",
        description: err.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Package className="h-5 w-5" />
      case "shipped":
        return <Truck className="h-5 w-5" />
      case "delivered":
        return <CircleCheck className="h-5 w-5 text-green-500" />
      default:
        return <Package className="h-5 w-5" />
    }
  }

  return (
    <div className="container max-w-3xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Order Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); fetchTrackingData(orderId) }} className="space-y-4 mb-6">
            <div>
              <Label htmlFor="trackOrderId">Enter Order ID</Label>
              <Input
                id="trackOrderId"
                type="text"
                placeholder="e.g., ORD12345"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Tracking..." : "Track Order"}
            </Button>
          </form>

          {loading && <p className="text-center text-muted-foreground">Loading tracking information...</p>}
          {error && <p className="text-center text-destructive">Error: {error}</p>}

          {trackingInfo && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Order #{trackingInfo.orderId}</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Current Status</p>
                  <p className="font-medium capitalize flex items-center gap-2">
                    {getStatusIcon(trackingInfo.status)}
                    {trackingInfo.status}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                  <p className="font-medium">{trackingInfo.estimatedDelivery}</p>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-3">Tracking History</h3>
              <div className="space-y-4">
                {trackingInfo.events.map((event, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "w-3 h-3 rounded-full border-2",
                          index === 0 ? "bg-primary border-primary" : "bg-muted-foreground border-muted-foreground",
                        )}
                      />
                      {index < trackingInfo.events.length - 1 && (
                        <Separator orientation="vertical" className="h-10 w-[2px] bg-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{event.status}</p>
                      <p className="text-sm text-muted-foreground">{event.timestamp}</p>
                      <p className="text-sm text-muted-foreground">{event.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 