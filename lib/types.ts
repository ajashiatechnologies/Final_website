export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  stock: number
  images: string[]
  rating: number
  reviews: number
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  description: string
  image: string
  slug: string
  created_at: string
}

export interface Order {
  id: string
  user_id: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  shipping_address: any
  payment_status: "pending" | "paid" | "failed"
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  product?: Product
}

export interface User {
  id: string
  email: string
  name: string
  role: "customer" | "admin"
  created_at: string
}
