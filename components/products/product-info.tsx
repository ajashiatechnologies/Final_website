"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart, ShoppingCart, Star, Truck, Shield, RotateCcw, Scale, Share2 } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { useWishlist } from "@/components/wishlist-provider"
import { useComparison } from "@/components/comparison-provider"
import type { Product } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist()
  const { addItem: addToComparison, isInComparison } = useComparison()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=300&h=300&fit=crop",
      quantity,
    })
  }

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0] || "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=300&h=300&fit=crop",
      })
    }
  }

  const handleAddToComparison = () => {
    addToComparison({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=300&h=300&fit=crop",
      category: product.category || "",
      specs: {
        Brand: "Ajashia",
        Stock: product.stock.toString(),
        Rating: product.rating.toString(),
        Price: formatPrice(product.price),
      },
    })
  }

  // Format price in Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="space-y-6">
      {/* Product Title and Rating */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          {product.featured && <Badge>Featured</Badge>}
          {product.stock < 5 && product.stock > 0 && <Badge variant="destructive">Low Stock</Badge>}
          {product.stock === 0 && <Badge variant="secondary">Out of Stock</Badge>}
        </div>

        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-5 w-5",
                  i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground",
                )}
              />
            ))}
            <span className="ml-2 text-sm font-medium">{product.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
        </div>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <div className="text-3xl font-bold">{formatPrice(product.price)}</div>
        <p className="text-sm text-muted-foreground">
          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        </p>
      </div>

      <Separator />

      {/* Description */}
      <div>
        <h3 className="font-semibold mb-2">Description</h3>
        <p className="text-muted-foreground">{product.description}</p>
      </div>

      <Separator />

      {/* Quantity and Add to Cart */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Label htmlFor="quantity">Quantity:</Label>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <Input
              id="quantity"
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
              className="w-20 text-center"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              disabled={quantity >= product.stock}
            >
              +
            </Button>
          </div>
        </div>

        <div className="flex gap-4">
          <Button className="flex-1" onClick={handleAddToCart} disabled={product.stock === 0} size="lg">
            <ShoppingCart className="mr-2 h-5 w-5" />
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={handleWishlistToggle}
            className={cn(isInWishlist(product.id) && "text-red-500")}
          >
            <Heart className={cn("h-5 w-5", isInWishlist(product.id) && "fill-current")} />
          </Button>

          <Button variant="outline" size="lg" onClick={handleAddToComparison}>
            <Scale className="h-5 w-5" />
          </Button>

          <Button variant="outline" size="lg">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Separator />

      {/* Features */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <Truck className="h-5 w-5 text-green-600" />
          <span>Free shipping on orders over ₹2,000</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Shield className="h-5 w-5 text-blue-600" />
          <span>2-year warranty included</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <RotateCcw className="h-5 w-5 text-orange-600" />
          <span>30-day return policy</span>
        </div>
      </div>
    </div>
  )
}
