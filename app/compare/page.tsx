"use client"

import { ProductComparison } from "@/components/comparison/product-comparison"
import { Button } from "@/components/ui/button"
import { Scale, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useComparison } from "@/components/comparison-provider"

export default function ComparePage() {
  const { items } = useComparison()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Compare Products</h1>
        <p className="text-muted-foreground">
          {items.length > 0 ? `Comparing ${items.length} products` : "No products to compare"}
        </p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <Scale className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
          <h2 className="text-2xl font-bold mb-4">No products to compare</h2>
          <p className="text-muted-foreground mb-8">Add products to compare their features side by side.</p>
          <Button asChild>
            <Link href="/products">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Browse Products
            </Link>
          </Button>
        </div>
      ) : (
        <ProductComparison />
      )}
    </div>
  )
}
