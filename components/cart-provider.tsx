"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

interface CartContextType {
  cart: CartItem[]
  isLoading: boolean
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function loadCart() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          // Load cart from localStorage for non-authenticated users
          const savedCart = localStorage.getItem("cart")
          if (savedCart) {
            setCart(JSON.parse(savedCart))
          }
          setIsLoading(false)
          return
        }

        // Load cart from database for authenticated users
        const { data: cartItems, error } = await supabase
          .from("cart_items")
          .select("*, products(*)")
          .eq("user_id", user.id)

        if (error) throw error

        const formattedCart = cartItems?.map(item => ({
          id: item.product_id,
          name: item.products.name,
          price: item.products.price,
          quantity: item.quantity,
          image: item.products.images?.[0],
        })) || []

        setCart(formattedCart)
      } catch (error) {
        console.error("Error loading cart:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCart()
  }, [supabase])

  const addItem = async (item: Omit<CartItem, "quantity">) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const existingItem = cart.find((i) => i.id === item.id)

      if (existingItem) {
        updateQuantity(item.id, existingItem.quantity + 1)
        return
      }

      const newItem = { ...item, quantity: 1 }
      const newCart = [...cart, newItem]
      setCart(newCart)

      if (!user) {
        localStorage.setItem("cart", JSON.stringify(newCart))
        return
      }

      await supabase.from("cart_items").insert({
        user_id: user.id,
        product_id: item.id,
        quantity: 1,
      })
    } catch (error) {
      console.error("Error adding item to cart:", error)
    }
  }

  const removeItem = async (id: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const newCart = cart.filter((item) => item.id !== id)
      setCart(newCart)

      if (!user) {
        localStorage.setItem("cart", JSON.stringify(newCart))
        return
      }

      await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", id)
    } catch (error) {
      console.error("Error removing item from cart:", error)
    }
  }

  const updateQuantity = async (id: string, quantity: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const newCart = cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
      setCart(newCart)

      if (!user) {
        localStorage.setItem("cart", JSON.stringify(newCart))
        return
      }

      await supabase
        .from("cart_items")
        .update({ quantity })
        .eq("user_id", user.id)
        .eq("product_id", id)
    } catch (error) {
      console.error("Error updating cart item quantity:", error)
    }
  }

  const clearCart = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      setCart([])

      if (!user) {
        localStorage.removeItem("cart")
        return
      }

      await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", user.id)
    } catch (error) {
      console.error("Error clearing cart:", error)
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount: cart.reduce((total, item) => total + item.quantity, 0),
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
