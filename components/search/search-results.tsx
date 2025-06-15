"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/products/product-card"
import type { Product } from "@/lib/types"
import { getUnsplashImageUrl } from "@/lib/unsplash"

interface SearchResultsProps {
  query: string
}

export function SearchResults({ query }: SearchResultsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const searchProducts = async () => {
      setLoading(true)

      // Mock search results with Unsplash images
      const mockResults: Product[] = [
        {
          id: "search-1",
          name: "Arduino Uno R3 Compatible",
          description: "High-quality Arduino Uno compatible board",
          price: 24.99,
          category: "Arduino",
          category_id: "arduino",
          stock: 45,
          images: [getUnsplashImageUrl("arduino microcontroller board", 300, 300)],
          rating: 4.7,
          reviews: 128,
          featured: false,
          created_at: "2024-01-01",
          updated_at: "2024-01-01",
          slug: "arduino-uno-compatible",
        },
        {
          id: "search-2",
          name: "ESP32 WiFi Module",
          description: "Powerful WiFi and Bluetooth enabled microcontroller",
          price: 16.99,
          category: "IoT",
          category_id: "iot",
          stock: 32,
          images: [getUnsplashImageUrl("esp32 wifi bluetooth module", 300, 300)],
          rating: 4.8,
          reviews: 89,
          featured: true,
          created_at: "2024-01-01",
          updated_at: "2024-01-01",
          slug: "esp32-wifi-module",
        },
        {
          id: "search-3",
          name: "Raspberry Pi 4 Model B 8GB",
          description: "Latest Raspberry Pi with 8GB RAM",
          price: 89.99,
          category: "Single Board Computers",
          category_id: "sbc",
          stock: 18,
          images: [getUnsplashImageUrl("raspberry pi 4 computer board", 300, 300)],
          rating: 4.9,
          reviews: 203,
          featured: true,
          created_at: "2024-01-01",
          updated_at: "2024-01-01",
          slug: "raspberry-pi-4-8gb",
        },
        {
          id: "search-4",
          name: "DHT22 Temperature Humidity Sensor",
          description: "Accurate digital temperature and humidity sensor",
          price: 12.99,
          category: "Sensors",
          category_id: "sensors",
          stock: 67,
          images: [getUnsplashImageUrl("temperature humidity sensor dht22", 300, 300)],
          rating: 4.6,
          reviews: 156,
          featured: false,
          created_at: "2024-01-01",
          updated_at: "2024-01-01",
          slug: "dht22-sensor",
        },
        {
          id: "search-5",
          name: "OLED Display 128x64 I2C",
          description: "High contrast OLED display with I2C interface",
          price: 9.99,
          category: "Displays",
          category_id: "displays",
          stock: 94,
          images: [getUnsplashImageUrl("oled display screen module", 300, 300)],
          rating: 4.5,
          reviews: 78,
          featured: false,
          created_at: "2024-01-01",
          updated_at: "2024-01-01",
          slug: "oled-display-128x64",
        },
        {
          id: "search-6",
          name: "Ultrasonic Distance Sensor HC-SR04",
          description: "Accurate ultrasonic distance measurement sensor",
          price: 8.99,
          category: "Sensors",
          category_id: "sensors",
          stock: 123,
          images: [getUnsplashImageUrl("ultrasonic sensor hc-sr04", 300, 300)],
          rating: 4.4,
          reviews: 92,
          featured: false,
          created_at: "2024-01-01",
          updated_at: "2024-01-01",
          slug: "ultrasonic-sensor",
        },
      ]

      // Filter results based on query
      const filteredResults = query
        ? mockResults.filter(
            (product) =>
              product.name.toLowerCase().includes(query.toLowerCase()) ||
              product.description.toLowerCase().includes(query.toLowerCase()) ||
              product.category.toLowerCase().includes(query.toLowerCase()),
          )
        : mockResults

      setTimeout(() => {
        setProducts(filteredResults)
        setLoading(false)
      }, 500)
    }

    searchProducts()
  }, [query])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-muted rounded-lg h-64 mb-4"></div>
            <div className="bg-muted rounded h-4 mb-2"></div>
            <div className="bg-muted rounded h-4 w-2/3"></div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <span className="text-2xl">🔍</span>
        </div>
        <h3 className="text-lg font-semibold mb-2">No products found</h3>
        <p className="text-muted-foreground">
          {query ? `No results for "${query}"` : "Try adjusting your search terms"}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
