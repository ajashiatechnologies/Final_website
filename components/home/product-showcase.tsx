"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ImageSwiper } from "@/components/ui/image-swiper"
import { Star, ShoppingCart } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { motion } from "framer-motion"

const featuredProducts = [
  {
    id: "1",
    name: "Arduino Uno R3",
    price: 25.99,
    originalPrice: 29.99,
    rating: 4.8,
    reviews: 156,
    images:
      "/placeholder.svg?height=300&width=300,/placeholder.svg?height=300&width=300,/placeholder.svg?height=300&width=300",
    badge: "Best Seller",
    description: "The classic Arduino board for beginners and professionals",
  },
  {
    id: "2",
    name: "Raspberry Pi 4 Model B",
    price: 75.0,
    originalPrice: 85.0,
    rating: 4.9,
    reviews: 203,
    images:
      "/placeholder.svg?height=300&width=300,/placeholder.svg?height=300&width=300,/placeholder.svg?height=300&width=300",
    badge: "New",
    description: "Powerful single-board computer for advanced projects",
  },
  {
    id: "3",
    name: "Sensor Kit Pro",
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.7,
    reviews: 89,
    images:
      "/placeholder.svg?height=300&width=300,/placeholder.svg?height=300&width=300,/placeholder.svg?height=300&width=300",
    badge: "Sale",
    description: "Complete sensor kit with 37 different sensors",
  },
]

export function ProductShowcase() {
  const { addItem } = useCart()

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images.split(",")[0],
      quantity: 1,
    })
  }

  return (
    <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Featured Products</h2>
        <p className="mt-4 text-xl text-muted-foreground">Discover our most popular electronic components and kits</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {featuredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="relative">
                <div className="flex justify-center p-4">
                  <ImageSwiper images={product.images} cardWidth={200} cardHeight={200} />
                </div>
                {product.badge && (
                  <Badge
                    className="absolute top-2 left-2"
                    variant={product.badge === "Sale" ? "destructive" : "default"}
                  >
                    {product.badge}
                  </Badge>
                )}
              </div>

              <CardContent className="p-6">
                <h3 className="mb-2 text-xl font-semibold">{product.name}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{product.description}</p>

                <div className="mb-4 flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                </div>

                <div className="mb-4 flex items-center gap-2">
                  <span className="text-2xl font-bold">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                  )}
                </div>

                <Button className="w-full" onClick={() => handleAddToCart(product)}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
