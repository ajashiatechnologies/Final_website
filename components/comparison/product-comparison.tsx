"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, ShoppingCart } from "lucide-react"
import { useComparison, type ComparisonItem } from "@/components/comparison-provider"
import { useCart } from "@/components/cart-provider"

interface ProductComparisonProps {
  products: ComparisonItem[]
}

export function ProductComparison({ products }: ProductComparisonProps) {
  const { removeItem, clearAll } = useComparison()
  const { addItem } = useCart()

  const handleAddToCart = (product: ComparisonItem) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  // Get all unique spec keys
  const allSpecs = Array.from(new Set(products.flatMap((product) => Object.keys(product.specs))))

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Product Comparison</h2>
        <Button variant="outline" onClick={clearAll}>
          Clear All
        </Button>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Product Headers */}
          <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}>
            <div></div>
            {products.map((product) => (
              <Card key={product.id}>
                <CardHeader className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => removeItem(product.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="text-center">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded mx-auto mb-4"
                    />
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <p className="text-2xl font-bold text-primary">${product.price}</p>
                    <Badge variant="secondary" className="mt-2">
                      {product.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" onClick={() => handleAddToCart(product)}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Specifications Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allSpecs.map((spec) => (
                  <div
                    key={spec}
                    className="grid gap-4 py-3 border-b last:border-b-0"
                    style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}
                  >
                    <div className="font-medium">{spec}</div>
                    {products.map((product) => (
                      <div key={product.id} className="text-sm">
                        {product.specs[spec] || "N/A"}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Price Comparison */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Price Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}>
                <div className="font-medium">Price</div>
                {products.map((product) => (
                  <div key={product.id} className="text-2xl font-bold text-primary">
                    ${product.price}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
