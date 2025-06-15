"use client"

import { ProductCard } from "@/components/products/product-card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

// Mock trending products data
const trendingProducts = [
  {
    id: "1",
    name: "Arduino Uno R3",
    price: 25.99,
    originalPrice: 29.99,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 156,
    category: "Arduino",
    inStock: true,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "2",
    name: "DHT22 Temperature Sensor",
    price: 12.99,
    originalPrice: 15.99,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 89,
    category: "Sensors",
    inStock: true,
    isNew: true,
    isFeatured: false,
  },
  {
    id: "3",
    name: "ESP32 Development Board",
    price: 18.99,
    originalPrice: 22.99,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 234,
    category: "IoT",
    inStock: true,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "4",
    name: "Starter Kit Pro",
    price: 89.99,
    originalPrice: 109.99,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 67,
    category: "Kits",
    inStock: true,
    isNew: false,
    isFeatured: false,
  },
]

export function TrendingProducts() {
  return (
    <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Trending Products</h2>
          <p className="mt-2 text-lg text-muted-foreground">Most popular items this week</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Button variant="outline" asChild>
            <Link href="/products">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {trendingProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
