"use client"

import { useEffect, useState } from "react"
import { ProductCard } from "./product-card"
import type { Product } from "@/lib/types"

interface RelatedProductsProps {
  categoryId: string
  currentProductId: string
}

// Mock related products with Unsplash images
const mockRelatedProducts: Product[] = [
  {
    id: "related-1",
    name: "Arduino Nano",
    description: "Compact Arduino board perfect for small projects",
    price: 18.99,
    category: "Arduino",
    category_id: "arduino",
    stock: 25,
    images: ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop"],
    rating: 4.7,
    reviews: 89,
    featured: false,
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
    slug: "arduino-nano",
  },
  {
    id: "related-2",
    name: "ESP32 Development Board",
    description: "WiFi and Bluetooth enabled microcontroller",
    price: 15.99,
    category: "IoT",
    category_id: "iot",
    stock: 40,
    images: ["https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=300&h=300&fit=crop"],
    rating: 4.8,
    reviews: 156,
    featured: true,
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
    slug: "esp32-dev-board",
  },
  {
    id: "related-3",
    name: "Sensor Kit Pro",
    description: "37 sensors for all your project needs",
    price: 49.99,
    category: "Kits",
    category_id: "kits",
    stock: 15,
    images: ["https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&h=300&fit=crop"],
    rating: 4.9,
    reviews: 203,
    featured: true,
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
    slug: "sensor-kit-pro",
  },
  {
    id: "related-4",
    name: "OLED Display 128x64",
    description: "High contrast OLED display module",
    price: 9.99,
    category: "Modules",
    category_id: "modules",
    stock: 60,
    images: ["https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&h=300&fit=crop"],
    rating: 4.6,
    reviews: 78,
    featured: false,
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
    slug: "oled-display",
  },
]

export function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadRelatedProducts = async () => {
      try {
        // For now, use mock data. In production, this would fetch from the API
        const filteredProducts = mockRelatedProducts.filter((p) => p.id !== currentProductId)
        setProducts(filteredProducts)
      } catch (error) {
        console.error("Error loading related products:", error)
        setProducts(mockRelatedProducts.filter((p) => p.id !== currentProductId))
      } finally {
        setLoading(false)
      }
    }

    loadRelatedProducts()
  }, [categoryId, currentProductId])

  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-8">Related Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-muted rounded-lg h-64 mb-4"></div>
              <div className="bg-muted rounded h-4 mb-2"></div>
              <div className="bg-muted rounded h-4 w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">Related Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
