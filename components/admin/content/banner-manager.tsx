"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2 } from "lucide-react"

const banners = [
  {
    id: 1,
    title: "Summer Sale",
    description: "Up to 50% off on selected items",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=200&fit=crop",
    isActive: true,
    position: "top",
  },
  {
    id: 2,
    title: "New Arrivals",
    description: "Check out our latest products",
    imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=200&fit=crop",
    isActive: false,
    position: "middle",
  },
]

export function BannerManager() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Banner Management</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Banner
        </Button>
      </div>

      <div className="grid gap-4">
        {banners.map((banner) => (
          <Card key={banner.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={banner.imageUrl || "/placeholder.svg"}
                    alt={banner.title}
                    className="w-20 h-12 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium">{banner.title}</h3>
                    <p className="text-sm text-muted-foreground">{banner.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline">{banner.position}</Badge>
                      <Badge variant={banner.isActive ? "default" : "secondary"}>
                        {banner.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Banner</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="banner-title">Title</Label>
              <Input id="banner-title" placeholder="Banner title" />
            </div>
            <div>
              <Label htmlFor="banner-description">Description</Label>
              <Input id="banner-description" placeholder="Banner description" />
            </div>
            <div>
              <Label htmlFor="banner-image">Image URL</Label>
              <Input id="banner-image" placeholder="https://example.com/image.jpg" />
            </div>
            <div className="flex space-x-4">
              <Button>Save Banner</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
