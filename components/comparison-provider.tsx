"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { toast } from "@/components/ui/use-toast"

export type ComparisonItem = {
  id: string
  name: string
  price: number
  image: string
  category: string
  specs: Record<string, string>
}

type ComparisonContextType = {
  items: ComparisonItem[]
  addItem: (item: ComparisonItem) => void
  removeItem: (id: string) => void
  clearAll: () => void
  isInComparison: (id: string) => boolean
}

const ComparisonContext = createContext<ComparisonContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearAll: () => {},
  isInComparison: () => false,
})

export function ComparisonProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ComparisonItem[]>([])

  const addItem = (item: ComparisonItem) => {
    if (items.length >= 4) {
      toast({
        title: "Comparison limit reached",
        description: "You can compare up to 4 products at a time.",
        variant: "destructive",
      })
      return
    }

    setItems((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev
      return [...prev, item]
    })
    toast({ title: "Added to comparison", description: `${item.name} has been added to comparison.` })
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
    toast({ title: "Removed from comparison", description: "Item has been removed from comparison." })
  }

  const clearAll = () => {
    setItems([])
    toast({ title: "Comparison cleared", description: "All items have been removed from comparison." })
  }

  const isInComparison = (id: string) => {
    return items.some((item) => item.id === id)
  }

  return (
    <ComparisonContext.Provider value={{ items, addItem, removeItem, clearAll, isInComparison }}>
      {children}
    </ComparisonContext.Provider>
  )
}

export const useComparison = () => useContext(ComparisonContext)
