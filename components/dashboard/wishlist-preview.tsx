"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/components/wishlist-provider"
import Link from "next/link"
import { Heart } from "lucide-react"

export function WishlistPreview() {
  const { items } = useWishlist()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5" />
          Wishlist
        </CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link href="/wishlist">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <div className="text-center py-8">
            <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No items in wishlist</p>
            <Button variant="outline" size="sm" className="mt-2" asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {items.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.name}</p>
                  <p className="text-sm text-muted-foreground">${item.price}</p>
                </div>
              </div>
            ))}
            {items.length > 3 && (
              <p className="text-sm text-muted-foreground text-center">+{items.length - 3} more items</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
