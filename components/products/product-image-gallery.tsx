"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface ProductImageGalleryProps {
  images: string[]
}

export function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const productImages =
    images.length > 0
      ? images
      : [
          "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=500&h=500&fit=crop",
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=500&fit=crop",
          "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=500&h=500&fit=crop",
        ]

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % productImages.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        <img
          src={productImages[currentImage] || "/placeholder.svg"}
          alt="Product"
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />

        {/* Navigation Arrows */}
        {productImages.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Zoom Button */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <img
              src={productImages[currentImage] || "/placeholder.svg"}
              alt="Product"
              className="h-full w-full object-contain"
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Thumbnail Images */}
      {productImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {productImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={cn(
                "flex-shrink-0 aspect-square w-20 h-20 rounded-md overflow-hidden border-2 transition-colors",
                currentImage === index ? "border-primary" : "border-transparent",
              )}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Product ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
