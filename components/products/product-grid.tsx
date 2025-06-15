"use client"

import { useEffect, useState } from "react"
import { ProductCard } from "./product-card"
import { getProducts } from "@/lib/products"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)

  const loadProducts = async (pageNum: number, reset = false) => {
    if (pageNum === 0 || !reset) setLoading(true)
    else setLoadingMore(true)

    try {
      const newProducts = await getProducts({
        limit: 12,
        offset: pageNum * 12,
      })

      if (reset) {
        setProducts(newProducts)
      } else {
        setProducts((prev) => [...prev, ...newProducts])
      }

      setHasMore(newProducts.length === 12)
    } catch (error) {
      console.error("Error loading products:", error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    loadProducts(0, true)
  }, [])

  const loadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    loadProducts(nextPage)
  }

  if (loading && products.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-muted rounded-lg h-64 mb-4"></div>
            <div className="bg-muted rounded h-4 mb-2"></div>
            <div className="bg-muted rounded h-4 w-2/3"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-8">
          <Button onClick={loadMore} disabled={loadingMore} variant="outline" size="lg">
            {loadingMore && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Load More Products
          </Button>
        </div>
      )}
    </div>
  )
}
