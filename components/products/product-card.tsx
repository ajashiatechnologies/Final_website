"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ImageSwiper } from "@/components/ui/image-swiper"
import { Heart, ShoppingCart, Star, Eye, Scale } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { useWishlist } from "@/components/wishlist-provider"
import { useComparison } from "@/components/comparison-provider"
import type { Product } from "@/lib/types"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist()
  const { addItem: addToComparison, isInComparison } = useComparison()

  const getProductImage = () => {
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images[0]
    }
    return "/placeholder.svg"
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: getProductImage(),
      slug: product.id // Using product.id as slug since it's not in the Product type
    })
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: getProductImage(),
      })
    }
  }

  const handleAddToComparison = (e: React.MouseEvent) => {
    e.preventDefault()
    addToComparison({
      id: product.id,
      name: product.name,
      price: product.price,
      image: getProductImage(),
      category: product.category || "",
      specs: {
        Brand: "Ajashia",
        Stock: product.stock.toString(),
        Rating: product.rating.toString(),
      },
    })
  }

  const images = Array.isArray(product.images) && product.images.length > 0 
    ? product.images.join(",") 
    : "/placeholder.svg?height=300&width=300"

  // Format price in Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
        <div className="relative">
          <div className="flex justify-center p-4">
            <ImageSwiper images={images} cardWidth={200} cardHeight={200} />
          </div>

          {product.featured && (
            <Badge className="absolute top-2 left-2" variant="default">
              Featured
            </Badge>
          )}

          {product.stock < 5 && product.stock > 0 && (
            <Badge className="absolute top-2 right-2" variant="destructive">
              Low Stock
            </Badge>
          )}

          {product.stock === 0 && (
            <Badge className="absolute top-2 right-2" variant="secondary">
              Out of Stock
            </Badge>
          )}

          {/* Quick Actions */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <Button
              size="icon"
              variant="secondary"
              onClick={handleWishlistToggle}
              className={cn("transition-colors", isInWishlist(product.id) && "text-red-500")}
            >
              <Heart className={cn("h-4 w-4", isInWishlist(product.id) && "fill-current")} />
            </Button>
            <Button size="icon" variant="secondary">
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              onClick={handleAddToComparison}
              className={cn("transition-colors", isInComparison(product.id) && "text-blue-500")}
            >
              <Scale className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <CardContent className="p-6">
          <h3 className="mb-2 text-lg font-semibold line-clamp-2">{product.name}</h3>
          <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{product.description}</p>

          <div className="mb-4 flex items-center gap-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
            <span className="text-sm text-muted-foreground">
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>

          <Button className="w-full" onClick={handleAddToCart} disabled={product.stock === 0}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}
