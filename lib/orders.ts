import { supabase, supabaseAdmin } from "./supabase"

export async function createOrder(orderData: {
  userId: string
  items: { productId: string; quantity: number; price: number }[]
  shippingAddress: any
  total: number
}) {
  const { data: order, error: orderError } = await supabaseAdmin
    .from("orders")
    .insert({
      user_id: orderData.userId,
      total: orderData.total,
      shipping_address: orderData.shippingAddress,
      status: "pending",
      payment_status: "pending",
    })
    .select()
    .single()

  if (orderError) {
    throw new Error(`Failed to create order: ${orderError.message}`)
  }

  // Create order items
  const orderItems = orderData.items.map((item) => ({
    order_id: order.id,
    product_id: item.productId,
    quantity: item.quantity,
    price: item.price,
  }))

  const { error: itemsError } = await supabaseAdmin.from("order_items").insert(orderItems)

  if (itemsError) {
    throw new Error(`Failed to create order items: ${itemsError.message}`)
  }

  return order
}

export async function getUserOrders(userId: string) {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        *,
        products (
          name,
          images
        )
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching user orders:", error)
    return []
  }

  return data || []
}

export async function getOrderById(orderId: string, userId?: string) {
  let query = supabase
    .from("orders")
    .select(`
      *,
      order_items (
        *,
        products (
          name,
          images,
          price
        )
      )
    `)
    .eq("id", orderId)

  if (userId) {
    query = query.eq("user_id", userId)
  }

  const { data, error } = await query.single()

  if (error) {
    console.error("Error fetching order:", error)
    return null
  }

  return data
}

export async function updateOrderStatus(orderId: string, status: string) {
  const { error } = await supabaseAdmin
    .from("orders")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", orderId)

  if (error) {
    throw new Error(`Failed to update order status: ${error.message}`)
  }
}

export async function getAllOrders(filters?: {
  status?: string
  dateRange?: [string, string]
  limit?: number
  offset?: number
}) {
  let query = supabaseAdmin.from("orders").select(`
      *,
      users (
        name,
        email
      ),
      order_items (
        quantity,
        price,
        products (
          name
        )
      )
    `)

  if (filters?.status) {
    query = query.eq("status", filters.status)
  }

  if (filters?.dateRange) {
    query = query.gte("created_at", filters.dateRange[0]).lte("created_at", filters.dateRange[1])
  }

  if (filters?.limit) {
    query = query.limit(filters.limit)
  }

  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
  }

  query = query.order("created_at", { ascending: false })

  const { data, error } = await query

  if (error) {
    console.error("Error fetching orders:", error)
    return []
  }

  return data || []
}
