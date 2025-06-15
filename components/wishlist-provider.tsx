"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"

export type WishlistItem = {
  id: string
  name: string
  price: number
  image: string
}

type WishlistContextType = {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  isInWishlist: (id: string) => boolean
}

const WishlistContext = createContext<WishlistContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  isInWishlist: () => false,
})

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("wishlist")
    if (stored) {
      try {
        setItems(JSON.parse(stored))
      } catch (error) {
        console.error("Failed to parse wishlist:", error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(items))
  }, [items])

  const addItem = (item: WishlistItem) => {
    setItems((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev
      return [...prev, item]
    })
    toast({ title: "Added to wishlist", description: `${item.name} has been added to your wishlist.` })
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
    toast({ title: "Removed from wishlist", description: "Item has been removed from your wishlist." })
  }

  const isInWishlist = (id: string) => {
    return items.some((item) => item.id === id)
  }

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, isInWishlist }}>{children}</WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
