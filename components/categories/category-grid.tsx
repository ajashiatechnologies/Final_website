"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { motion } from "framer-motion"

interface Category {
  id: string
  name: string
  description: string
  slug: string
  image: string
  productCount?: number
}

const mockCategories: Category[] = [
  {
    id: "1",
    name: "Arduino",
    description: "Boards, shields, and accessories for Arduino projects",
    slug: "arduino",
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop",
    productCount: 45,
  },
  {
    id: "2",
    name: "Sensors",
    description: "Temperature, motion, light, and environmental sensors",
    slug: "sensors",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=300&fit=crop",
    productCount: 78,
  },
  {
    id: "3",
    name: "Raspberry Pi",
    description: "Single-board computers and accessories",
    slug: "raspberry-pi",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",
    productCount: 32,
  },
  {
    id: "4",
    name: "IoT Modules",
    description: "WiFi, Bluetooth, and communication modules",
    slug: "iot",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    productCount: 56,
  },
  {
    id: "5",
    name: "Project Kits",
    description: "Complete kits for learning and building",
    slug: "kits",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=300&fit=crop",
    productCount: 23,
  },
  {
    id: "6",
    name: "Components",
    description: "LEDs, resistors, capacitors, and basic components",
    slug: "components",
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop",
    productCount: 156,
  },
  {
    id: "7",
    name: "Tools",
    description: "Soldering irons, multimeters, and development tools",
    slug: "tools",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",
    productCount: 34,
  },
  {
    id: "8",
    name: "Displays",
    description: "LCD, OLED, and LED display modules",
    slug: "displays",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    productCount: 28,
  },
]

export function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCategories = async () => {
      try {
        // For now, use mock data. In production, this would fetch from Supabase
        setCategories(mockCategories)
      } catch (error) {
        console.error("Error loading categories:", error)
        setCategories(mockCategories)
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-muted rounded-lg h-48 mb-4"></div>
            <div className="bg-muted rounded h-4 mb-2"></div>
            <div className="bg-muted rounded h-4 w-2/3"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Link href={`/categories/${category.slug}`}>
            <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {category.productCount} products
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
