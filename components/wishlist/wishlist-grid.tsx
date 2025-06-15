"use client"

import { ProductCard } from "@/components/products/product-card"
import type { WishlistItem } from "@/components/wishlist-provider"
import type { Product } from "@/lib/types"

interface WishlistGridProps {
  items: WishlistItem[]
}

export function WishlistGrid({ items }: WishlistGridProps) {
  // Convert wishlist items to product format for ProductCard
  const products: Product[] = items.map((item) => ({
    id: item.id,
    name: item.name,
    description: "Saved to your wishlist",
    price: item.price,
    category: "Electronics",
    category_id: "electronics",
    stock: 10, // Assume in stock
    images: [item.image],
    rating: 4.5,
    reviews: 0,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    slug: item.id,
  }))

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
