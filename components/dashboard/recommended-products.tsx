"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductCard } from "@/components/products/product-card"
import type { Product } from "@/lib/types"
import { getUnsplashImageUrl } from "@/lib/unsplash"

const recommendedProducts: Product[] = [
  {
    id: "rec-1",
    name: "Arduino Starter Kit",
    description: "Perfect kit for beginners with comprehensive tutorials",
    price: 79.99,
    category: "Kits",
    category_id: "kits",
    stock: 25,
    images: [getUnsplashImageUrl("arduino starter kit electronics", 300, 300)],
    rating: 4.8,
    reviews: 156,
    featured: true,
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
    slug: "arduino-starter-kit",
  },
  {
    id: "rec-2",
    name: "Raspberry Pi 4 Model B",
    description: "Latest Raspberry Pi with 8GB RAM",
    price: 89.99,
    category: "Single Board Computers",
    category_id: "sbc",
    stock: 15,
    images: [getUnsplashImageUrl("raspberry pi 4 computer board", 300, 300)],
    rating: 4.9,
    reviews: 203,
    featured: true,
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
    slug: "raspberry-pi-4",
  },
]

export function RecommendedProducts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended for You</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
