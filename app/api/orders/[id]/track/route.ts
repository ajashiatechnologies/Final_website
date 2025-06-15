import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const orderId = params.id
  const supabase = createRouteHandlerClient({ cookies })

  try {
    // In a real application, you might add authentication here to ensure
    // only the order owner or an admin can view detailed tracking.
    // For now, we'll allow fetching by order ID.

    // Fetch order details to verify existence and get current status
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("id, status, created_at")
      .eq("id", orderId)
      .single()

    if (orderError || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Simulate tracking events based on order status and creation time
    // In a real application, this would come from a logistics/tracking service
    const orderCreatedAt = new Date(order.created_at)
    const trackingEvents = []

    // Event: Order Placed
    trackingEvents.push({
      timestamp: orderCreatedAt.toLocaleString(),
      status: "Order Placed",
      location: "Online Store",
    })

    // Simulate progression based on status
    if (order.status === "processing" || order.status === "shipped" || order.status === "delivered") {
      const processingTime = new Date(orderCreatedAt.getTime() + 1 * 24 * 60 * 60 * 1000) // 1 day after order
      trackingEvents.push({
        timestamp: processingTime.toLocaleString(),
        status: "Processing",
        location: "Warehouse",
      })
    }

    if (order.status === "shipped" || order.status === "delivered") {
      const shippedTime = new Date(orderCreatedAt.getTime() + 2 * 24 * 60 * 60 * 1000) // 2 days after order
      trackingEvents.push({
        timestamp: shippedTime.toLocaleString(),
        status: "Shipped",
        location: "In Transit",
      })
    }

    if (order.status === "delivered") {
      const deliveredTime = new Date(orderCreatedAt.getTime() + 4 * 24 * 60 * 60 * 1000) // 4 days after order
      trackingEvents.push({
        timestamp: deliveredTime.toLocaleString(),
        status: "Delivered",
        location: "Customer Address",
      })
    }

    // Estimate delivery date
    const estimatedDeliveryDate = new Date(orderCreatedAt.getTime() + 5 * 24 * 60 * 60 * 1000)

    const trackingInfo = {
      orderId: order.id,
      status: order.status,
      estimatedDelivery: estimatedDeliveryDate.toLocaleDateString(),
      events: trackingEvents,
    }

    return NextResponse.json(trackingInfo, { status: 200 })
  } catch (error: any) {
    console.error("Error fetching tracking data:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
} 