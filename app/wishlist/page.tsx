"use client"

import { AuthCheck } from "@/components/auth-check"
import { WishlistGrid } from "@/components/wishlist/wishlist-grid"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useWishlist } from "@/components/wishlist-provider"

export default function WishlistPage() {
  const { items } = useWishlist()

  return (
    <AuthCheck>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
          <p className="text-muted-foreground">
            {items.length > 0 ? `${items.length} items saved for later` : "No items in your wishlist yet"}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
            <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8">Save items you love to your wishlist and shop them later.</p>
            <Button asChild>
              <Link href="/products">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Start Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <WishlistGrid />
        )}
      </div>
    </AuthCheck>
  )
}
